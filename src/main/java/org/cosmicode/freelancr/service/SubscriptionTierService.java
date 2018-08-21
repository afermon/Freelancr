package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.SubscriptionTier;
import org.cosmicode.freelancr.repository.SubscriptionTierRepository;
import org.cosmicode.freelancr.repository.search.SubscriptionTierSearchRepository;
import org.cosmicode.freelancr.service.dto.SubscriptionTierDTO;
import org.cosmicode.freelancr.service.mapper.SubscriptionTierMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing SubscriptionTier.
 */
@Service
@Transactional
public class SubscriptionTierService {

    private final Logger log = LoggerFactory.getLogger(SubscriptionTierService.class);

    private final SubscriptionTierRepository subscriptionTierRepository;

    private final SubscriptionTierMapper subscriptionTierMapper;

    private final SubscriptionTierSearchRepository subscriptionTierSearchRepository;

    public SubscriptionTierService(SubscriptionTierRepository subscriptionTierRepository, SubscriptionTierMapper subscriptionTierMapper, SubscriptionTierSearchRepository subscriptionTierSearchRepository) {
        this.subscriptionTierRepository = subscriptionTierRepository;
        this.subscriptionTierMapper = subscriptionTierMapper;
        this.subscriptionTierSearchRepository = subscriptionTierSearchRepository;
    }

    /**
     * Save a subscriptionTier.
     *
     * @param subscriptionTierDTO the entity to save
     * @return the persisted entity
     */
    public SubscriptionTierDTO save(SubscriptionTierDTO subscriptionTierDTO) {
        log.debug("Request to save SubscriptionTier : {}", subscriptionTierDTO);
        SubscriptionTier subscriptionTier = subscriptionTierMapper.toEntity(subscriptionTierDTO);
        subscriptionTier = subscriptionTierRepository.save(subscriptionTier);
        SubscriptionTierDTO result = subscriptionTierMapper.toDto(subscriptionTier);
        subscriptionTierSearchRepository.save(subscriptionTier);
        return result;
    }

    /**
     * Get all the subscriptionTiers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SubscriptionTierDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubscriptionTiers");
        return subscriptionTierRepository.findAll(pageable)
            .map(subscriptionTierMapper::toDto);
    }

    /**
     * Get one subscriptionTier by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SubscriptionTierDTO findOne(Long id) {
        log.debug("Request to get SubscriptionTier : {}", id);
        SubscriptionTier subscriptionTier = subscriptionTierRepository.findOneWithEagerRelationships(id);
        return subscriptionTierMapper.toDto(subscriptionTier);
    }

    /**
     * Delete the subscriptionTier by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SubscriptionTier : {}", id);
        subscriptionTierRepository.delete(id);
        subscriptionTierSearchRepository.delete(id);
    }

    /**
     * Search for the subscriptionTier corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SubscriptionTierDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of SubscriptionTiers for query {}", query);
        Page<SubscriptionTier> result = subscriptionTierSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(subscriptionTierMapper::toDto);
    }
}
