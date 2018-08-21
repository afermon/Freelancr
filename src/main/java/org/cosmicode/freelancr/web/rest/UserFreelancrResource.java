package org.cosmicode.freelancr.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.cosmicode.freelancr.service.UserFreelancrService;
import org.cosmicode.freelancr.web.rest.errors.BadRequestAlertException;
import org.cosmicode.freelancr.web.rest.util.HeaderUtil;
import org.cosmicode.freelancr.web.rest.util.PaginationUtil;
import org.cosmicode.freelancr.service.dto.UserFreelancrDTO;
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
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing UserFreelancr.
 */
@RestController
@RequestMapping("/api")
public class UserFreelancrResource {

    private final Logger log = LoggerFactory.getLogger(UserFreelancrResource.class);

    private static final String ENTITY_NAME = "userFreelancr";

    private final UserFreelancrService userFreelancrService;

    public UserFreelancrResource(UserFreelancrService userFreelancrService) {
        this.userFreelancrService = userFreelancrService;
    }

    /**
     * POST  /user-freelancrs : Create a new userFreelancr.
     *
     * @param userFreelancrDTO the userFreelancrDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userFreelancrDTO, or with status 400 (Bad Request) if the userFreelancr has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-freelancrs")
    @Timed
    public ResponseEntity<UserFreelancrDTO> createUserFreelancr(@Valid @RequestBody UserFreelancrDTO userFreelancrDTO) throws URISyntaxException {
        log.debug("REST request to save UserFreelancr : {}", userFreelancrDTO);
        if (userFreelancrDTO.getId() != null) {
            throw new BadRequestAlertException("A new userFreelancr cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserFreelancrDTO result = userFreelancrService.save(userFreelancrDTO);
        return ResponseEntity.created(new URI("/api/user-freelancrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-freelancrs : Updates an existing userFreelancr.
     *
     * @param userFreelancrDTO the userFreelancrDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userFreelancrDTO,
     * or with status 400 (Bad Request) if the userFreelancrDTO is not valid,
     * or with status 500 (Internal Server Error) if the userFreelancrDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-freelancrs")
    @Timed
    public ResponseEntity<UserFreelancrDTO> updateUserFreelancr(@Valid @RequestBody UserFreelancrDTO userFreelancrDTO) throws URISyntaxException {
        log.debug("REST request to update UserFreelancr : {}", userFreelancrDTO);
        if (userFreelancrDTO.getId() == null) {
            return createUserFreelancr(userFreelancrDTO);
        }
        UserFreelancrDTO result = userFreelancrService.save(userFreelancrDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userFreelancrDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-freelancrs : get all the userFreelancrs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userFreelancrs in body
     */
    @GetMapping("/user-freelancrs")
    @Timed
    public ResponseEntity<List<UserFreelancrDTO>> getAllUserFreelancrs(Pageable pageable) {
        log.debug("REST request to get a page of UserFreelancrs");
        Page<UserFreelancrDTO> page = userFreelancrService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-freelancrs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-freelancrs/:id : get the "id" userFreelancr.
     *
     * @param id the id of the userFreelancrDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userFreelancrDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-freelancrs/{id}")
    @Timed
    public ResponseEntity<UserFreelancrDTO> getUserFreelancr(@PathVariable Long id) {
        log.debug("REST request to get UserFreelancr : {}", id);
        UserFreelancrDTO userFreelancrDTO = userFreelancrService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userFreelancrDTO));
    }

    /**
     * GET  /logeduser : get the loged in userFreelancr.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the userFreelancrDTO, or with status 404 (Not Found)
     */
    @GetMapping("/logeduser")
    @Timed
    public ResponseEntity<UserFreelancrDTO> getUserFreelancr() {
        UserFreelancrDTO userFreelancrDTO = userFreelancrService.findByCurrentLogin();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userFreelancrDTO));
    }

    /**
     * DELETE  /user-freelancrs/:id : delete the "id" userFreelancr.
     *
     * @param id the id of the userFreelancrDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-freelancrs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserFreelancr(@PathVariable Long id) {
        log.debug("REST request to delete UserFreelancr : {}", id);
        userFreelancrService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/user-freelancrs?query=:query : search for the userFreelancr corresponding
     * to the query.
     *
     * @param query the query of the userFreelancr search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/user-freelancrs")
    @Timed
    public ResponseEntity<List<UserFreelancrDTO>> searchUserFreelancrs(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of UserFreelancrs for query {}", query);
        Page<UserFreelancrDTO> page = userFreelancrService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/user-freelancrs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/usernyjhi/{id}")
    @Timed
    public List<UserFreelancrDTO> getFreelancrByJhi(@PathVariable Long id) {
        return userFreelancrService.findByJhiUser(id);
    }
}
