package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Goal;
import org.cosmicode.freelancr.repository.GoalRepository;
import org.cosmicode.freelancr.repository.search.GoalSearchRepository;
import org.cosmicode.freelancr.service.dto.GoalDTO;
import org.cosmicode.freelancr.service.mapper.GoalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Goal.
 */
@Service
@Transactional
public class GoalService {

    private final Logger log = LoggerFactory.getLogger(GoalService.class);

    private final GoalRepository goalRepository;

    private final GoalMapper goalMapper;

    private final GoalSearchRepository goalSearchRepository;

    public GoalService(GoalRepository goalRepository, GoalMapper goalMapper, GoalSearchRepository goalSearchRepository) {
        this.goalRepository = goalRepository;
        this.goalMapper = goalMapper;
        this.goalSearchRepository = goalSearchRepository;
    }

    /**
     * Save a goal.
     *
     * @param goalDTO the entity to save
     * @return the persisted entity
     */
    public GoalDTO save(GoalDTO goalDTO) {
        log.debug("Request to save Goal : {}", goalDTO);
        Goal goal = goalMapper.toEntity(goalDTO);
        goal = goalRepository.save(goal);
        GoalDTO result = goalMapper.toDto(goal);
        goalSearchRepository.save(goal);
        return result;
    }

    /**
     * Get all the goals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<GoalDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Goals");
        return goalRepository.findAll(pageable)
            .map(goalMapper::toDto);
    }

    /**
     * Get one goal by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public GoalDTO findOne(Long id) {
        log.debug("Request to get Goal : {}", id);
        Goal goal = goalRepository.findOne(id);
        return goalMapper.toDto(goal);
    }

    /**
     * Delete the goal by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Goal : {}", id);
        goalRepository.delete(id);
        goalSearchRepository.delete(id);
    }

    /**
     * Search for the goal corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<GoalDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Goals for query {}", query);
        Page<Goal> result = goalSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(goalMapper::toDto);
    }

    /**
     * Search all goals by project id.
     * @param id the id of the project
     * @return the list of goals
     */
    @Transactional(readOnly = true)
    public List<GoalDTO> findAllByProjectId(long id) {
        List<GoalDTO> goals = goalMapper.toDto(goalRepository.findByProjectId(id));
        return goals;
    }
}
