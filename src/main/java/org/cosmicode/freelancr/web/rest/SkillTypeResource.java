package org.cosmicode.freelancr.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.cosmicode.freelancr.service.SkillTypeService;
import org.cosmicode.freelancr.web.rest.errors.BadRequestAlertException;
import org.cosmicode.freelancr.web.rest.util.HeaderUtil;
import org.cosmicode.freelancr.web.rest.util.PaginationUtil;
import org.cosmicode.freelancr.service.dto.SkillTypeDTO;
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
 * REST controller for managing SkillType.
 */
@RestController
@RequestMapping("/api")
public class SkillTypeResource {

    private final Logger log = LoggerFactory.getLogger(SkillTypeResource.class);

    private static final String ENTITY_NAME = "skillType";

    private final SkillTypeService skillTypeService;

    public SkillTypeResource(SkillTypeService skillTypeService) {
        this.skillTypeService = skillTypeService;
    }

    /**
     * POST  /skill-types : Create a new skillType.
     *
     * @param skillTypeDTO the skillTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new skillTypeDTO, or with status 400 (Bad Request) if the skillType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/skill-types")
    @Timed
    public ResponseEntity<SkillTypeDTO> createSkillType(@Valid @RequestBody SkillTypeDTO skillTypeDTO) throws URISyntaxException {
        log.debug("REST request to save SkillType : {}", skillTypeDTO);
        if (skillTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new skillType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SkillTypeDTO result = skillTypeService.save(skillTypeDTO);
        return ResponseEntity.created(new URI("/api/skill-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /skill-types : Updates an existing skillType.
     *
     * @param skillTypeDTO the skillTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated skillTypeDTO,
     * or with status 400 (Bad Request) if the skillTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the skillTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/skill-types")
    @Timed
    public ResponseEntity<SkillTypeDTO> updateSkillType(@Valid @RequestBody SkillTypeDTO skillTypeDTO) throws URISyntaxException {
        log.debug("REST request to update SkillType : {}", skillTypeDTO);
        if (skillTypeDTO.getId() == null) {
            return createSkillType(skillTypeDTO);
        }
        SkillTypeDTO result = skillTypeService.save(skillTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, skillTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /skill-types : get all the skillTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of skillTypes in body
     */
    @GetMapping("/skill-types")
    @Timed
    public ResponseEntity<List<SkillTypeDTO>> getAllSkillTypes(Pageable pageable) {
        log.debug("REST request to get a page of SkillTypes");
        Page<SkillTypeDTO> page = skillTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/skill-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /skill-types/:id : get the "id" skillType.
     *
     * @param id the id of the skillTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the skillTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/skill-types/{id}")
    @Timed
    public ResponseEntity<SkillTypeDTO> getSkillType(@PathVariable Long id) {
        log.debug("REST request to get SkillType : {}", id);
        SkillTypeDTO skillTypeDTO = skillTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(skillTypeDTO));
    }

    /**
     * DELETE  /skill-types/:id : delete the "id" skillType.
     *
     * @param id the id of the skillTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/skill-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteSkillType(@PathVariable Long id) {
        log.debug("REST request to delete SkillType : {}", id);
        skillTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/skill-types?query=:query : search for the skillType corresponding
     * to the query.
     *
     * @param query the query of the skillType search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/skill-types")
    @Timed
    public ResponseEntity<List<SkillTypeDTO>> searchSkillTypes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of SkillTypes for query {}", query);
        Page<SkillTypeDTO> page = skillTypeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/skill-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    //parametros van entre {}
    @GetMapping("/skillsbyname/{name}")
    @Timed
    //Path variable obtiene el parametro del url
    public List<SkillTypeDTO> getAllTypesByName(@PathVariable String name) {
        return skillTypeService.findAllBySkillName(name);
    }

}
