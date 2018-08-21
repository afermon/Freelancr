package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Position;
import org.cosmicode.freelancr.repository.PositionRepository;
import org.cosmicode.freelancr.repository.search.PositionSearchRepository;
import org.cosmicode.freelancr.service.dto.PositionDTO;
import org.cosmicode.freelancr.service.mapper.PositionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Position.
 */
@Service
@Transactional
public class PositionService {

    private final Logger log = LoggerFactory.getLogger(PositionService.class);

    private final PositionRepository positionRepository;

    private final PositionMapper positionMapper;

    private final PositionSearchRepository positionSearchRepository;

    public PositionService(PositionRepository positionRepository, PositionMapper positionMapper, PositionSearchRepository positionSearchRepository) {
        this.positionRepository = positionRepository;
        this.positionMapper = positionMapper;
        this.positionSearchRepository = positionSearchRepository;
    }

    /**
     * Save a position.
     *
     * @param positionDTO the entity to save
     * @return the persisted entity
     */
    public PositionDTO save(PositionDTO positionDTO) {
        log.debug("Request to save Position : {}", positionDTO);
        Position position = positionMapper.toEntity(positionDTO);
        position = positionRepository.save(position);
        PositionDTO result = positionMapper.toDto(position);
        positionSearchRepository.save(position);
        return result;
    }

    /**
     * Get all the positions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PositionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Positions");
        return positionRepository.findAll(pageable)
            .map(positionMapper::toDto);
    }

    /**
     * Get one position by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PositionDTO findOne(Long id) {
        log.debug("Request to get Position : {}", id);
        Position position = positionRepository.findOneWithEagerRelationships(id);
        return positionMapper.toDto(position);
    }

    /**
     * Delete the position by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Position : {}", id);
        positionRepository.delete(id);
        positionSearchRepository.delete(id);
    }

    /**
     * Search for the position corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PositionDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Positions for query {}", query);
        Page<Position> result = positionSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(positionMapper::toDto);
    }

    /**
     * Finds all the positions by project id
     * @param id the id of the project
     * @return the list of positions
     */
    @Transactional(readOnly = true)
    public List<PositionDTO> findAllByProjectId(long id) {
        List<PositionDTO> positions = positionMapper.toDto(positionRepository.findByProjectId(id));
        return positions;
    }
}
