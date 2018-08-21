package org.cosmicode.freelancr.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.cosmicode.freelancr.service.ApplicationMessageService;
import org.cosmicode.freelancr.web.rest.errors.BadRequestAlertException;
import org.cosmicode.freelancr.web.rest.util.HeaderUtil;
import org.cosmicode.freelancr.web.rest.util.PaginationUtil;
import org.cosmicode.freelancr.service.dto.ApplicationMessageDTO;
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
 * REST controller for managing ApplicationMessage.
 */
@RestController
@RequestMapping("/api")
public class ApplicationMessageResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationMessageResource.class);

    private static final String ENTITY_NAME = "applicationMessage";

    private final ApplicationMessageService applicationMessageService;

    public ApplicationMessageResource(ApplicationMessageService applicationMessageService) {
        this.applicationMessageService = applicationMessageService;
    }

    /**
     * POST  /application-messages : Create a new applicationMessage.
     *
     * @param applicationMessageDTO the applicationMessageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new applicationMessageDTO, or with status 400 (Bad Request) if the applicationMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/application-messages")
    @Timed
    public ResponseEntity<ApplicationMessageDTO> createApplicationMessage(@Valid @RequestBody ApplicationMessageDTO applicationMessageDTO) throws URISyntaxException {
        log.debug("REST request to save ApplicationMessage : {}", applicationMessageDTO);
        if (applicationMessageDTO.getId() != null) {
            throw new BadRequestAlertException("A new applicationMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApplicationMessageDTO result = applicationMessageService.save(applicationMessageDTO);
        return ResponseEntity.created(new URI("/api/application-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /application-messages : Updates an existing applicationMessage.
     *
     * @param applicationMessageDTO the applicationMessageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated applicationMessageDTO,
     * or with status 400 (Bad Request) if the applicationMessageDTO is not valid,
     * or with status 500 (Internal Server Error) if the applicationMessageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/application-messages")
    @Timed
    public ResponseEntity<ApplicationMessageDTO> updateApplicationMessage(@Valid @RequestBody ApplicationMessageDTO applicationMessageDTO) throws URISyntaxException {
        log.debug("REST request to update ApplicationMessage : {}", applicationMessageDTO);
        if (applicationMessageDTO.getId() == null) {
            return createApplicationMessage(applicationMessageDTO);
        }
        ApplicationMessageDTO result = applicationMessageService.save(applicationMessageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, applicationMessageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /application-messages : get all the applicationMessages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of applicationMessages in body
     */
    @GetMapping("/application-messages")
    @Timed
    public ResponseEntity<List<ApplicationMessageDTO>> getAllApplicationMessages(Pageable pageable) {
        log.debug("REST request to get a page of ApplicationMessages");
        Page<ApplicationMessageDTO> page = applicationMessageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/application-messages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /application-messages/:id : get the "id" applicationMessage.
     *
     * @param id the id of the applicationMessageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the applicationMessageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/application-messages/{id}")
    @Timed
    public ResponseEntity<ApplicationMessageDTO> getApplicationMessage(@PathVariable Long id) {
        log.debug("REST request to get ApplicationMessage : {}", id);
        ApplicationMessageDTO applicationMessageDTO = applicationMessageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(applicationMessageDTO));
    }

    /**
     * DELETE  /application-messages/:id : delete the "id" applicationMessage.
     *
     * @param id the id of the applicationMessageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/application-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteApplicationMessage(@PathVariable Long id) {
        log.debug("REST request to delete ApplicationMessage : {}", id);
        applicationMessageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/application-messages?query=:query : search for the applicationMessage corresponding
     * to the query.
     *
     * @param query the query of the applicationMessage search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/application-messages")
    @Timed
    public ResponseEntity<List<ApplicationMessageDTO>> searchApplicationMessages(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ApplicationMessages for query {}", query);
        Page<ApplicationMessageDTO> page = applicationMessageService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/application-messages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET
     * @param id
     * @return
     */
    @GetMapping("/messagessbyapplication/{id}")
    @Timed
    public List<ApplicationMessageDTO> getAllMessagesByApplication(@PathVariable Long id) {
        return applicationMessageService.findAllByApplicationId(id);
    }

}
