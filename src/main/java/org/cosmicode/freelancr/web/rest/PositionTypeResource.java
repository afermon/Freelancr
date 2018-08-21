package org.cosmicode.freelancr.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.cosmicode.freelancr.service.PositionTypeService;
import org.cosmicode.freelancr.web.rest.errors.BadRequestAlertException;
import org.cosmicode.freelancr.web.rest.util.HeaderUtil;
import org.cosmicode.freelancr.web.rest.util.PaginationUtil;
import org.cosmicode.freelancr.service.dto.PositionTypeDTO;
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
 * REST controller for managing PositionType.
 */
@RestController
@RequestMapping("/api")
public class PositionTypeResource {

    private final Logger log = LoggerFactory.getLogger(PositionTypeResource.class);

    private static final String ENTITY_NAME = "positionType";

    private final PositionTypeService positionTypeService;

    public PositionTypeResource(PositionTypeService positionTypeService) {
        this.positionTypeService = positionTypeService;
    }

    /**
     * POST  /position-types : Create a new positionType.
     *
     * @param positionTypeDTO the positionTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new positionTypeDTO, or with status 400 (Bad Request) if the positionType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/position-types")
    @Timed
    public ResponseEntity<PositionTypeDTO> createPositionType(@Valid @RequestBody PositionTypeDTO positionTypeDTO) throws URISyntaxException {
        log.debug("REST request to save PositionType : {}", positionTypeDTO);
        if (positionTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new positionType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PositionTypeDTO result = positionTypeService.save(positionTypeDTO);
        return ResponseEntity.created(new URI("/api/position-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /position-types : Updates an existing positionType.
     *
     * @param positionTypeDTO the positionTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated positionTypeDTO,
     * or with status 400 (Bad Request) if the positionTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the positionTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/position-types")
    @Timed
    public ResponseEntity<PositionTypeDTO> updatePositionType(@Valid @RequestBody PositionTypeDTO positionTypeDTO) throws URISyntaxException {
        log.debug("REST request to update PositionType : {}", positionTypeDTO);
        if (positionTypeDTO.getId() == null) {
            return createPositionType(positionTypeDTO);
        }
        PositionTypeDTO result = positionTypeService.save(positionTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, positionTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /position-types : get all the positionTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of positionTypes in body
     */
    @GetMapping("/position-types")
    @Timed
    public ResponseEntity<List<PositionTypeDTO>> getAllPositionTypes(Pageable pageable) {
        log.debug("REST request to get a page of PositionTypes");
        Page<PositionTypeDTO> page = positionTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/position-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /position-types/:id : get the "id" positionType.
     *
     * @param id the id of the positionTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the positionTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/position-types/{id}")
    @Timed
    public ResponseEntity<PositionTypeDTO> getPositionType(@PathVariable Long id) {
        log.debug("REST request to get PositionType : {}", id);
        PositionTypeDTO positionTypeDTO = positionTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(positionTypeDTO));
    }

    /**
     * DELETE  /position-types/:id : delete the "id" positionType.
     *
     * @param id the id of the positionTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/position-types/{id}")
    @Timed
    public ResponseEntity<Void> deletePositionType(@PathVariable Long id) {
        log.debug("REST request to delete PositionType : {}", id);
        positionTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/position-types?query=:query : search for the positionType corresponding
     * to the query.
     *
     * @param query the query of the positionType search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/position-types")
    @Timed
    public ResponseEntity<List<PositionTypeDTO>> searchPositionTypes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of PositionTypes for query {}", query);
        Page<PositionTypeDTO> page = positionTypeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/position-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/positionsbyname/{name}")
    @Timed
    public List<PositionTypeDTO> getTypesByName(@PathVariable String name) {
        return positionTypeService.findAllByPositionName(name);
    }

}
