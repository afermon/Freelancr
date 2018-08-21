package org.cosmicode.freelancr.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.cosmicode.freelancr.service.SubscriptionTierService;
import org.cosmicode.freelancr.web.rest.errors.BadRequestAlertException;
import org.cosmicode.freelancr.web.rest.util.HeaderUtil;
import org.cosmicode.freelancr.web.rest.util.PaginationUtil;
import org.cosmicode.freelancr.service.dto.SubscriptionTierDTO;
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
 * REST controller for managing SubscriptionTier.
 */
@RestController
@RequestMapping("/api")
public class SubscriptionTierResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionTierResource.class);

    private static final String ENTITY_NAME = "subscriptionTier";

    private final SubscriptionTierService subscriptionTierService;

    public SubscriptionTierResource(SubscriptionTierService subscriptionTierService) {
        this.subscriptionTierService = subscriptionTierService;
    }

    /**
     * POST  /subscription-tiers : Create a new subscriptionTier.
     *
     * @param subscriptionTierDTO the subscriptionTierDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subscriptionTierDTO, or with status 400 (Bad Request) if the subscriptionTier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/subscription-tiers")
    @Timed
    public ResponseEntity<SubscriptionTierDTO> createSubscriptionTier(@Valid @RequestBody SubscriptionTierDTO subscriptionTierDTO) throws URISyntaxException {
        log.debug("REST request to save SubscriptionTier : {}", subscriptionTierDTO);
        if (subscriptionTierDTO.getId() != null) {
            throw new BadRequestAlertException("A new subscriptionTier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscriptionTierDTO result = subscriptionTierService.save(subscriptionTierDTO);
        return ResponseEntity.created(new URI("/api/subscription-tiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subscription-tiers : Updates an existing subscriptionTier.
     *
     * @param subscriptionTierDTO the subscriptionTierDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subscriptionTierDTO,
     * or with status 400 (Bad Request) if the subscriptionTierDTO is not valid,
     * or with status 500 (Internal Server Error) if the subscriptionTierDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/subscription-tiers")
    @Timed
    public ResponseEntity<SubscriptionTierDTO> updateSubscriptionTier(@Valid @RequestBody SubscriptionTierDTO subscriptionTierDTO) throws URISyntaxException {
        log.debug("REST request to update SubscriptionTier : {}", subscriptionTierDTO);
        if (subscriptionTierDTO.getId() == null) {
            return createSubscriptionTier(subscriptionTierDTO);
        }
        SubscriptionTierDTO result = subscriptionTierService.save(subscriptionTierDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subscriptionTierDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subscription-tiers : get all the subscriptionTiers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of subscriptionTiers in body
     */
    @GetMapping("/subscription-tiers")
    @Timed
    public ResponseEntity<List<SubscriptionTierDTO>> getAllSubscriptionTiers(Pageable pageable) {
        log.debug("REST request to get a page of SubscriptionTiers");
        Page<SubscriptionTierDTO> page = subscriptionTierService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/subscription-tiers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /subscription-tiers/:id : get the "id" subscriptionTier.
     *
     * @param id the id of the subscriptionTierDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subscriptionTierDTO, or with status 404 (Not Found)
     */
    @GetMapping("/subscription-tiers/{id}")
    @Timed
    public ResponseEntity<SubscriptionTierDTO> getSubscriptionTier(@PathVariable Long id) {
        log.debug("REST request to get SubscriptionTier : {}", id);
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(subscriptionTierDTO));
    }

    /**
     * DELETE  /subscription-tiers/:id : delete the "id" subscriptionTier.
     *
     * @param id the id of the subscriptionTierDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/subscription-tiers/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubscriptionTier(@PathVariable Long id) {
        log.debug("REST request to delete SubscriptionTier : {}", id);
        subscriptionTierService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/subscription-tiers?query=:query : search for the subscriptionTier corresponding
     * to the query.
     *
     * @param query the query of the subscriptionTier search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/subscription-tiers")
    @Timed
    public ResponseEntity<List<SubscriptionTierDTO>> searchSubscriptionTiers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of SubscriptionTiers for query {}", query);
        Page<SubscriptionTierDTO> page = subscriptionTierService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/subscription-tiers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
