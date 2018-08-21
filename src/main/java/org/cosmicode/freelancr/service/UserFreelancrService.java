package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.UserFreelancr;
import org.cosmicode.freelancr.repository.UserFreelancrRepository;
import org.cosmicode.freelancr.repository.search.UserFreelancrSearchRepository;
import org.cosmicode.freelancr.service.dto.UserFreelancrDTO;
import org.cosmicode.freelancr.service.mapper.UserFreelancrMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing UserFreelancr.
 */
@Service
@Transactional
public class UserFreelancrService {

    private final Logger log = LoggerFactory.getLogger(UserFreelancrService.class);

    private final UserFreelancrRepository userFreelancrRepository;

    private final UserFreelancrMapper userFreelancrMapper;

    private final UserFreelancrSearchRepository userFreelancrSearchRepository;

    public UserFreelancrService(UserFreelancrRepository userFreelancrRepository, UserFreelancrMapper userFreelancrMapper, UserFreelancrSearchRepository userFreelancrSearchRepository) {
        this.userFreelancrRepository = userFreelancrRepository;
        this.userFreelancrMapper = userFreelancrMapper;
        this.userFreelancrSearchRepository = userFreelancrSearchRepository;
    }

    /**
     * Save a userFreelancr.
     *
     * @param userFreelancrDTO the entity to save
     * @return the persisted entity
     */
    public UserFreelancrDTO save(UserFreelancrDTO userFreelancrDTO) {
        log.debug("Request to save UserFreelancr : {}", userFreelancrDTO);
        UserFreelancr userFreelancr = userFreelancrMapper.toEntity(userFreelancrDTO);
        userFreelancr = userFreelancrRepository.save(userFreelancr);
        UserFreelancrDTO result = userFreelancrMapper.toDto(userFreelancr);
        userFreelancrSearchRepository.save(userFreelancr);
        return result;
    }

    /**
     * Get all the userFreelancrs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserFreelancrDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserFreelancrs");
        return userFreelancrRepository.findAll(pageable)
            .map(userFreelancrMapper::toDto);
    }

    /**
     * Get one userFreelancr by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserFreelancrDTO findOne(Long id) {
        log.debug("Request to get UserFreelancr : {}", id);
        UserFreelancr userFreelancr = userFreelancrRepository.findOne(id);
        return userFreelancrMapper.toDto(userFreelancr);
    }

    /**
     * Get one userFreelancr by current login
     *
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserFreelancrDTO findByCurrentLogin() {
        UserFreelancr userFreelancr = userFreelancrRepository.findByUserIsCurrentUser();
        return userFreelancrMapper.toDto(userFreelancr);
    }

    /**
     * Delete the userFreelancr by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserFreelancr : {}", id);
        userFreelancrRepository.delete(id);
        userFreelancrSearchRepository.delete(id);
    }

    /**
     * Search for the userFreelancr corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserFreelancrDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of UserFreelancrs for query {}", query);
        Page<UserFreelancr> result = userFreelancrSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(userFreelancrMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<UserFreelancrDTO> findByJhiUser(Long id){
        return userFreelancrMapper.toDto(userFreelancrRepository.finByJhiUserId(id));
    }

    public void updateRating(Long id, double ranking){
        UserFreelancrDTO user = this.findOne(id);
        user.setRanking((int) ranking);
        this.save(user);
    }
}
