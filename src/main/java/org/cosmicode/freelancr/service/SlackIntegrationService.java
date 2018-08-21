package org.cosmicode.freelancr.service;

import allbegray.slack.SlackClientFactory;
import allbegray.slack.exception.SlackArgumentException;
import allbegray.slack.exception.SlackResponseErrorException;
import allbegray.slack.type.Group;
import allbegray.slack.webapi.SlackWebApiClient;

import org.cosmicode.freelancr.config.Constants;
import org.cosmicode.freelancr.domain.Position;
import org.cosmicode.freelancr.domain.Project;
import org.cosmicode.freelancr.domain.User;

import org.cosmicode.freelancr.domain.enumeration.ProjectStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;


/**
 * Service Implementation for Slack integration.
 */
@Service
@Transactional
public class SlackIntegrationService {

    private final Logger log = LoggerFactory.getLogger(SlackIntegrationService.class);

    private final SlackWebApiClient slackWebApiClient;

    public SlackIntegrationService() {
        this.slackWebApiClient = SlackClientFactory.createWebApiClient(Constants.SLACK_TOKEN);
    }

    /**
     * Create the private slack channel for the team.
     * @param project
     * @return updated project.
     */
    public Project createSlackChannel(Project project) {
        log.debug("Create Slack Private Channel for project: " + project.getId());

        try {
            Group projectSlackChannel = slackWebApiClient.createGroup("p-" + project.getId());
            log.debug(projectSlackChannel.toString());

            slackWebApiClient.setGroupTopic(projectSlackChannel.getId(), project.getTitle());
            slackWebApiClient.setGroupPurpose(projectSlackChannel.getId(), project.getDescription());
            slackWebApiClient.postMessage(projectSlackChannel.getId(), project.getTitle() + " project has been started.");

            project.setSlackChannel(projectSlackChannel.getId());
        } catch (SlackArgumentException e) {
            log.error(e.getMessage());
            project.setSlackChannel(null);
        } catch (SlackResponseErrorException e) {
            log.error(e.getMessage());
            project.setSlackChannel(null);
        }

        return project;
    }

    /**
     * Adds current project members to the private Slack Channel
     * @param project
     */
    public void updateSlackMembership(Project project) {

        Group slackGroup = slackWebApiClient.getGroupInfo(project.getSlackChannel());

        if(slackGroup == null) return;

        List<allbegray.slack.type.User> slackUserList = slackWebApiClient.getUserList();

        if(slackUserList.isEmpty()) return;

        log.debug("Add project administrator to channel: {}", project.getUser().getLogin());

        Optional<allbegray.slack.type.User> projectAdminSlackUser = slackUserList.stream().filter(o -> project.getUser().getEmail().equals(o.getProfile().getEmail())).findFirst();

        if(!projectAdminSlackUser.isPresent()) {
            log.error("Project admin does not have a slack user associated with his email, slack not created.");
            return;
        }

        slackWebApiClient.inviteUserToGroup(project.getSlackChannel(), projectAdminSlackUser.get().getId());

        for (Position position: project.getPositions()) {
            for (User hiredUser: position.getHiredUsers()) {
                log.debug("Add project collaborator to slack: {}", hiredUser.getLogin());
                Optional<allbegray.slack.type.User> collaboratorSlackUser = slackUserList.stream().filter(o -> hiredUser.getEmail().equals(o.getProfile().getEmail())).findFirst();
                if(collaboratorSlackUser.isPresent()) {
                    slackWebApiClient.inviteUserToGroup(project.getSlackChannel(), collaboratorSlackUser.get().getId());
                } else {
                    log.error("{} does not have a slack user associated with his email", hiredUser.getEmail());
                }
            }
        }
    }

    /**
     * Gets last 10 messages for slack channel.
     * @param slackChannel
     * @return
     */
    public List<allbegray.slack.type.Message> getSlackLatestMessages(String slackChannel) {
        allbegray.slack.type.History groupHistory = slackWebApiClient.getGroupHistory(slackChannel, 10);
        return groupHistory.getMessages();
    }

    /**
     * Remove current project members to the private Slack Channel
     * @param project
     */
    public void removeSlackMembership(Project project){

        Group slackGroup = slackWebApiClient.getGroupInfo(project.getSlackChannel());

        if(slackGroup == null) return;

        List<allbegray.slack.type.User> slackUserList = slackWebApiClient.getUserList();

        if(slackUserList.isEmpty()) return;

        Optional<allbegray.slack.type.User> projectAdminSlackUser = slackUserList.stream().filter(o -> project.getUser().getEmail().equals(o.getProfile().getEmail())).findFirst();

        if(!projectAdminSlackUser.isPresent()) {
            log.error("Project admin does not have a slack user associated with his email, slack not created.");
            return;
        }

        try {
            for (String slackUser: slackGroup.getMembers()) {
                log.debug("Checking channel access for {}", slackUser);
                if (!slackUser.equals(projectAdminSlackUser.get().getId()) && !slackUser.equals(Constants.SLACK_ADMIN_USER)){ //Do not remove freelancer nor project admin.
                    slackWebApiClient.kickUserFromGroup(slackGroup.getId(), slackUser);
                    log.debug("Removed {} from project channel", slackUser);
                }
            }
        } catch(Exception e){
            log.error(e.getMessage());
        }
    }

    /**
     * Send a message to a project channel
     * @param slackChannel
     * @param message
     * @return true if message was sent correctly.
     */
    public boolean sendMessageChannel(String slackChannel, String message){
        try {
            //Check channel exist
            Group slackGroup = slackWebApiClient.getGroupInfo(slackChannel);
            if(slackGroup == null) { return false; }
            //send message
            slackWebApiClient.postMessage(slackChannel, message);
        }  catch(Exception e){
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

    /**
     * Update slack Channel membership after the positions changed on an "IN_PROGRESS" project
     * @param project
     * @return true if update completed correct.
     */
    public boolean updateSlackPositionsChanged(Project project){
        if (!project.getStatus().equals(ProjectStatus.IN_PROGRESS)) return false;
        // Remove all current slack users.
        removeSlackMembership(project);
        // Add all current project collaborators to slack.
        updateSlackMembership(project);
        return true;
    }
}
