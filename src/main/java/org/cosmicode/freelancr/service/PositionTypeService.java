package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.PositionType;
import org.cosmicode.freelancr.repository.PositionTypeRepository;
import org.cosmicode.freelancr.repository.search.PositionTypeSearchRepository;
import org.cosmicode.freelancr.service.dto.PositionTypeDTO;
import org.cosmicode.freelancr.service.mapper.PositionTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing PositionType.
 */
@Service
@Transactional
public class PositionTypeService {

    private final Logger log = LoggerFactory.getLogger(PositionTypeService.class);

    private final PositionTypeRepository positionTypeRepository;

    private final PositionTypeMapper positionTypeMapper;

    private final PositionTypeSearchRepository positionTypeSearchRepository;

    public PositionTypeService(PositionTypeRepository positionTypeRepository, PositionTypeMapper positionTypeMapper, PositionTypeSearchRepository positionTypeSearchRepository) {
        this.positionTypeRepository = positionTypeRepository;
        this.positionTypeMapper = positionTypeMapper;
        this.positionTypeSearchRepository = positionTypeSearchRepository;
    }

    /**
     * Save a positionType.
     *
     * @param positionTypeDTO the entity to save
     * @return the persisted entity
     */
    public PositionTypeDTO save(PositionTypeDTO positionTypeDTO) {
        log.debug("Request to save PositionType : {}", positionTypeDTO);
        PositionType positionType = positionTypeMapper.toEntity(positionTypeDTO);
        positionType = positionTypeRepository.save(positionType);
        PositionTypeDTO result = positionTypeMapper.toDto(positionType);
        positionTypeSearchRepository.save(positionType);
        return result;
    }

    /**
     * Get all the positionTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PositionTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PositionTypes");
        return positionTypeRepository.findAll(pageable)
            .map(positionTypeMapper::toDto);
    }

    /**
     * Get one positionType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PositionTypeDTO findOne(Long id) {
        log.debug("Request to get PositionType : {}", id);
        PositionType positionType = positionTypeRepository.findOne(id);
        return positionTypeMapper.toDto(positionType);
    }

    /**
     * Delete the positionType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PositionType : {}", id);
        positionTypeRepository.delete(id);
        positionTypeSearchRepository.delete(id);
    }

    /**
     * Search for the positionType corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PositionTypeDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of PositionTypes for query {}", query);
        Page<PositionType> result = positionTypeSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(positionTypeMapper::toDto);
    }

    /**
     * Finds all position types by name
     * @param name The name of the position
     * @return the list of positions
     */
    @Transactional(readOnly = true)
    public List<PositionTypeDTO> findAllByPositionName(String name) {
        List<PositionTypeDTO> positionTypes = positionTypeMapper.toDto(positionTypeRepository.findByPTypeName(name));
        return positionTypes;
    }
}
