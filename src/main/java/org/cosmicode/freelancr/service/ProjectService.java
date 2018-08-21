package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Project;
import org.cosmicode.freelancr.domain.enumeration.ProjectStatus;
import org.cosmicode.freelancr.repository.ProjectRepository;
import org.cosmicode.freelancr.repository.search.ProjectSearchRepository;
import org.cosmicode.freelancr.service.dto.ProjectDTO;
import org.cosmicode.freelancr.service.mapper.ProjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Project.
 */
@Service
@Transactional
public class ProjectService {

    private final Logger log = LoggerFactory.getLogger(ProjectService.class);

    private final ProjectRepository projectRepository;

    private final ProjectMapper projectMapper;

    private final ProjectSearchRepository projectSearchRepository;

    private final SlackIntegrationService slackIntegrationService;

    private final GithubIntegrationService githubIntegrationService;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper, ProjectSearchRepository projectSearchRepository, GithubIntegrationService githubIntegrationService, SlackIntegrationService slackIntegrationService) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.projectSearchRepository = projectSearchRepository;
        this.githubIntegrationService = githubIntegrationService;
        this.slackIntegrationService = slackIntegrationService;
    }

    /**
     * Save a project.
     *
     * @param projectDTO the entity to save
     * @return the persisted entity
     */
    public ProjectDTO save(ProjectDTO projectDTO) {
        log.debug("Request to save Project : {}", projectDTO);
        Project project = projectMapper.toEntity(projectDTO);
        project = projectRepository.save(project);
        ProjectDTO result = projectMapper.toDto(project);
        projectSearchRepository.save(project);
        return result;
    }

    /**
     * Get all the projects.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProjectDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Projects");
        return projectRepository.findAll(pageable)
            .map(projectMapper::toDto);
    }

    /**
     * Get one project by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ProjectDTO findOne(Long id) {
        log.debug("Request to get Project : {}", id);
        Project project = projectRepository.findOneWithEagerRelationships(id);
        return projectMapper.toDto(project);
    }

    /**
     * Delete the project by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Project : {}", id);
        projectRepository.delete(id);
        projectSearchRepository.delete(id);
    }

    /**
     * Search for the project corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProjectDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Projects for query {}", query);
        Page<Project> result = projectSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(projectMapper::toDto);
    }

    /**
     * Finds all sent messages of the current logged user
     * @return the list of projects that are no finished
     */
    public List<ProjectDTO> findByProjectNotFinished() {
        List<ProjectDTO> projects = projectMapper.toDto(projectRepository.findByProjectNotFinished());
        return projects;
    }


    @Transactional(readOnly = true)
    public List<ProjectDTO> findByUser() {
        List<ProjectDTO> result = projectMapper.toDto(projectRepository.findByUserIsCurrentUser());
        return result;
    }

    /**
     * Returns all active projects in which the user is an active member
     * @return
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> findByMember() {
        List<ProjectDTO> result = projectMapper.toDto(projectRepository.findByMember());
        return result;
    }

    /**
     * Starts the project creating the repo, slack channel and adds the hired users.
     * @param projectDTO  to update
     */
    public ProjectDTO startProject(ProjectDTO projectDTO) throws IOException {
        Project project = projectRepository.findOneWithEagerRelationships(projectDTO.getId());

        project = githubIntegrationService.createGithubRepo(project);
        githubIntegrationService.updateGithubMembership(project);

        project = slackIntegrationService.createSlackChannel(project);
        slackIntegrationService.updateSlackMembership(project);

        project.setStartDate(LocalDate.now());
        project.setStatus(ProjectStatus.IN_PROGRESS);

        return save(projectMapper.toDto(project));
    }

    /**
     *
     * @param projectDTO
     * @return
     * @throws IOException
     */
    public ProjectDTO finishProject(ProjectDTO projectDTO) throws IOException {
        Project project = projectRepository.findOneWithEagerRelationships(projectDTO.getId());

        githubIntegrationService.removeGithubMembership(project);

        slackIntegrationService.removeSlackMembership(project);

        project.setEndDate(LocalDate.now());
        project.setStatus(ProjectStatus.FINISHED);

        return save(projectMapper.toDto(project));
    }

    /**
     * Update project membership.
     * @param projectId
     */
    public void updateProjectMembership(Long projectId) {
        Project project = projectRepository.findOneWithEagerRelationships(projectId);
        githubIntegrationService.updateGithubMembership(project);
        slackIntegrationService.updateSlackMembership(project);
    }
}
