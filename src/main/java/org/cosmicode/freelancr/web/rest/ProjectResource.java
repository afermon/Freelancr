package org.cosmicode.freelancr.web.rest;

import allbegray.slack.type.Message;
import com.codahale.metrics.annotation.Timed;
import com.jcabi.github.RepoCommits;
import org.cosmicode.freelancr.domain.enumeration.ProjectStatus;
import org.cosmicode.freelancr.service.GithubIntegrationService;
import org.cosmicode.freelancr.service.ProjectService;
import org.cosmicode.freelancr.service.SlackIntegrationService;
import org.cosmicode.freelancr.service.dto.GithubCommitDTO;
import org.cosmicode.freelancr.web.rest.errors.BadRequestAlertException;
import org.cosmicode.freelancr.web.rest.errors.InternalServerErrorException;
import org.cosmicode.freelancr.web.rest.util.HeaderUtil;
import org.cosmicode.freelancr.web.rest.util.PaginationUtil;
import org.cosmicode.freelancr.service.dto.ProjectDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Project.
 */
@RestController
@RequestMapping("/api")
public class ProjectResource {

    private final Logger log = LoggerFactory.getLogger(ProjectResource.class);

    private static final String ENTITY_NAME = "project";

    private final ProjectService projectService;

    private final SlackIntegrationService slackIntegrationService;

    private final GithubIntegrationService githubIntegrationService;

    public ProjectResource(ProjectService projectService, GithubIntegrationService githubIntegrationService, SlackIntegrationService slackIntegrationService) {
        this.projectService = projectService;
        this.githubIntegrationService = githubIntegrationService;
        this.slackIntegrationService = slackIntegrationService;
    }

    /**
     * POST  /projects : Create a new project.
     *
     * @param projectDTO the projectDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new projectDTO, or with status 400 (Bad Request) if the project has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/projects")
    @Timed
    public ResponseEntity<ProjectDTO> createProject(@Valid @RequestBody ProjectDTO projectDTO) throws URISyntaxException {
        log.debug("REST request to save Project : {}", projectDTO);
        if (projectDTO.getId() != null) {
            throw new BadRequestAlertException("A new project cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectDTO result = projectService.save(projectDTO);
        return ResponseEntity.created(new URI("/api/projects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /projects : Updates an existing project.
     *
     * @param projectDTO the projectDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated projectDTO,
     * or with status 400 (Bad Request) if the projectDTO is not valid,
     * or with status 500 (Internal Server Error) if the projectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/projects")
    @Timed
    public ResponseEntity<ProjectDTO> updateProject(@Valid @RequestBody ProjectDTO projectDTO) throws URISyntaxException {
        log.debug("REST request to update Project : {}", projectDTO);
        if (projectDTO.getId() == null) {
            return createProject(projectDTO);
        }
        ProjectDTO result = projectService.save(projectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, projectDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /projects : get all the projects.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of projects in body
     */
    @GetMapping("/projects")
    @Timed
    public ResponseEntity<List<ProjectDTO>> getAllProjects(Pageable pageable) {
        log.debug("REST request to get a page of Projects");
        Page<ProjectDTO> page = projectService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/projects");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /projects/:id : get the "id" project.
     *
     * @param id the id of the projectDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the projectDTO, or with status 404 (Not Found)
     */
    @GetMapping("/projects/{id}")
    @Timed
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        log.debug("REST request to get Project : {}", id);
        ProjectDTO projectDTO = projectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(projectDTO));
    }

    /**
     * DELETE  /projects/:id : delete the "id" project.
     *
     * @param id the id of the projectDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/projects/{id}")
    @Timed
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        log.debug("REST request to delete Project : {}", id);
        projectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/projects?query=:query : search for the project corresponding
     * to the query.
     *
     * @param query the query of the project search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/projects")
    @Timed
    public ResponseEntity<List<ProjectDTO>> searchProjects(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Projects for query {}", query);
        Page<ProjectDTO> page = projectService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/projects");


        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/notfinished")
    @Timed
    public List<ProjectDTO> findByProjectNotFinished() {
        return projectService.findByProjectNotFinished();
    }

    @GetMapping("/projectbyuser")
    @Timed
    public List<ProjectDTO> searchProjectByUser(){
        return projectService.findByUser();
    }

    /**
     * Return all active projects in which the user is an active member.
     * @return
     */
    @GetMapping("/projectactivemember")
    @Timed
    public List<ProjectDTO> searchProjectActiveMember(){
        return projectService.findByMember();
    }

    /**
     * PUT  /projects : Starts an existing project.
     *
     * @param projectDTO the projectDTO to start
     * @return the ResponseEntity with status 200 (OK) and with body the updated projectDTO,
     * or with status 400 (Bad Request) if the projectDTO is not valid,
     * or with status 500 (Internal Server Error) if the projectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/projectstart")
    @Timed
    public ResponseEntity<ProjectDTO> startProject(@Valid @RequestBody ProjectDTO projectDTO) {
        log.debug("REST request to start Project : {}", projectDTO);

        ProjectDTO dbProjectDTO = projectService.findOne(projectDTO.getId());
        if (dbProjectDTO.getId() == null || !projectDTO.getStatus().equals(ProjectStatus.PUBLISHED)) {
            return ResponseUtil.wrapOrNotFound(Optional.ofNullable(null));
        }

        ProjectDTO result;
        try {
            result = projectService.startProject(dbProjectDTO);
        } catch (IOException e) {
            throw new BadRequestAlertException("Failed", ENTITY_NAME, "project.start");
        }

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, projectDTO.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /projects : Finish an existing project.
     *
     * @param projectDTO the projectDTO to start
     * @return the ResponseEntity with status 200 (OK) and with body the updated projectDTO,
     * or with status 400 (Bad Request) if the projectDTO is not valid,
     * or with status 500 (Internal Server Error) if the projectDTO couldn't be updated
     */
    @PutMapping("/projectfinish")
    @Timed
    public ResponseEntity<ProjectDTO> finishProject(@Valid @RequestBody ProjectDTO projectDTO) {
        log.debug("REST request to finish Project : {}", projectDTO);

        ProjectDTO dbProjectDTO = projectService.findOne(projectDTO.getId());
        if (dbProjectDTO.getId() == null || !projectDTO.getStatus().equals(ProjectStatus.IN_PROGRESS)) {
            throw new BadRequestAlertException("Failed", ENTITY_NAME, "project.notstarted");
        }

        ProjectDTO result;
        try {
            result = projectService.finishProject(dbProjectDTO);
        } catch (IOException e) {
            throw new BadRequestAlertException("Failed", ENTITY_NAME, "project.finish");
        }

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, projectDTO.getId().toString()))
            .body(result);
    }

    /**
     * Returns latest messages on slack if a project is already started.
     * @param id
     * @return
     */
    @GetMapping("/projectslackmessages/{id}")
    @Timed
    public ResponseEntity<List<Message>> getSlackMessages(@PathVariable Long id){
        log.debug("REST request to get slack messages for project : {}", id);
        ProjectDTO projectDTO = projectService.findOne(id);
        if (projectDTO == null)
            return ResponseEntity.badRequest().headers(HeaderUtil.createAlert("Project not found", id.toString())).body(null);

        if(!projectDTO.getStatus().equals(ProjectStatus.IN_PROGRESS) && !projectDTO.getStatus().equals(ProjectStatus.FINISHED))
            throw new BadRequestAlertException("Failed", ENTITY_NAME, "project.notstarted");

        try {
            return ResponseEntity.ok().body(slackIntegrationService.getSlackLatestMessages(projectDTO.getSlackChannel()));
        } catch (Exception e) {
            throw new BadRequestAlertException("Failed", ENTITY_NAME, "http.500");
        }
    }

    /**
     * Returns latest commits if a project is already started.
     * @param id
     * @return
     */
    @GetMapping("/projectrepocommits/{id}")
    @Timed
    public ResponseEntity<List<GithubCommitDTO>> getRepoCommits(@PathVariable Long id){
        log.debug("REST request to get repo commits for project : {}", id);
        ProjectDTO projectDTO = projectService.findOne(id);
        if (projectDTO == null)
            return ResponseEntity.badRequest().headers(HeaderUtil.createAlert("Project not found", id.toString())).body(null);

        if(!projectDTO.getStatus().equals(ProjectStatus.IN_PROGRESS) && !projectDTO.getStatus().equals(ProjectStatus.FINISHED))
            throw new BadRequestAlertException("Failed", ENTITY_NAME, "project.notstarted");

        try {
            return ResponseEntity.ok().body(githubIntegrationService.getRepoCommits(projectDTO.getGitRepo()));
        } catch (Exception e) {
            throw new BadRequestAlertException("Failed", ENTITY_NAME, "http.500");
        }
    }
}
