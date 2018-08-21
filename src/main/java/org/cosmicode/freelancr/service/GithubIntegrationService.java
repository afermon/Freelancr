package org.cosmicode.freelancr.service;

import com.jcabi.github.*;
import org.cosmicode.freelancr.config.Constants;
import org.cosmicode.freelancr.domain.Position;
import org.cosmicode.freelancr.domain.Project;
import org.cosmicode.freelancr.domain.User;
import org.cosmicode.freelancr.service.dto.GithubCommitDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;

/**
 * Service Implementation for GitHub integration.
 */
@Service
@Transactional
public class GithubIntegrationService {

    private final Logger log = LoggerFactory.getLogger(GithubIntegrationService.class);

    private final Github githubWepApiClient;

    public GithubIntegrationService() {
        this.githubWepApiClient = new RtGithub(Constants.GITHUB_TOKEN);
    }

    /**
     * Create GitHub repository for the project
     * @param project
     * @return updated repo.
     * @throws IOException
     */
    public Project createGithubRepo(Project project) throws IOException {
        String repoName = "p-" + project.getId();
        log.debug("Create repo: {}", repoName);

        Repo repo = githubWepApiClient.repos().create(new Repos.RepoCreate(repoName, true));

        project.setGitRepo(repoName);

        return project;
    }

    /**
     * Updates GitHub repo membership.
     * @param project
     */
    public void updateGithubMembership(Project project) {
        Repo repo = githubWepApiClient.repos().get(new Coordinates.Simple(Constants.GITHUB_ACCOUNT + "/" + project.getGitRepo()));
        log.debug(repo.toString());

        try {
            log.debug("Add git administrator: {}", project.getUser().getLogin());
            repo.collaborators().add(project.getUser().getLogin());

        } catch (AssertionError e){
            log.error(e.getMessage()); // 201  means invitation was sent and not actually an error
        } catch (IOException e ){
            log.error(e.getMessage());
        }

        for (Position position: project.getPositions()) {
            for (User hiredUser: position.getHiredUsers()) {
                try {
                    log.debug("Add git collaborator: {}", hiredUser.getLogin());
                    repo.collaborators().add(hiredUser.getLogin());
                } catch (AssertionError e){
                    log.error(e.getMessage()); // 201  means invitation was sent and not actually an error
                } catch (IOException e ){
                    log.error(e.getMessage());
                }
            }
        }
    }

    /**
     * Get last 20 commits from GitHub repo.
     * @param gitRepo
     * @return
     */
    public List<GithubCommitDTO> getRepoCommits(String gitRepo) {
        Repo repo = githubWepApiClient.repos().get(new Coordinates.Simple(Constants.GITHUB_ACCOUNT + "/" + gitRepo));
        RepoCommits commits = repo.commits();

        Map<String, String> params = new HashMap<>();

        List<GithubCommitDTO> commitsList = new ArrayList<>();

        try {
            for (RepoCommit commit: commits.iterate(params)){
                RepoCommit.Smart smartCommit = new RepoCommit.Smart(commit);
                commitsList.add(new GithubCommitDTO(smartCommit.sha(), smartCommit.message()));
                if (commitsList.size() > 9) break; // Allow only 10 commits to be processed.
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        } catch (AssertionError e) {
            log.error(e.getMessage()); // Repo is empty.
        }

        return commitsList;
    }

    /**
     * Removes gitHub repo membership.
     * @param project
     */
    public void removeGithubMembership(Project project) {
        Repo repo = githubWepApiClient.repos().get(new Coordinates.Simple(Constants.GITHUB_ACCOUNT + "/" + project.getGitRepo()));
        log.debug(repo.toString());

        try {
            for (com.jcabi.github.User user: repo.collaborators().iterate()){
                log.debug("Checking repo access for {}", user.login());
                if(!user.login().equals(project.getUser().getLogin()) && !user.login().equals(Constants.GITHUB_ACCOUNT)) {
                    repo.collaborators().remove(user.login());
                    log.debug("Removed {} from project repo", user.login());
                }
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
