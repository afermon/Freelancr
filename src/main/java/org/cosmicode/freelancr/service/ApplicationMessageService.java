package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.ApplicationMessage;
import org.cosmicode.freelancr.repository.ApplicationMessageRepository;
import org.cosmicode.freelancr.repository.search.ApplicationMessageSearchRepository;
import org.cosmicode.freelancr.service.dto.ApplicationMessageDTO;
import org.cosmicode.freelancr.service.mapper.ApplicationMessageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ApplicationMessage.
 */
@Service
@Transactional
public class ApplicationMessageService {

    private final Logger log = LoggerFactory.getLogger(ApplicationMessageService.class);

    private final ApplicationMessageRepository applicationMessageRepository;

    private final ApplicationMessageMapper applicationMessageMapper;

    private final ApplicationMessageSearchRepository applicationMessageSearchRepository;

    public ApplicationMessageService(ApplicationMessageRepository applicationMessageRepository, ApplicationMessageMapper applicationMessageMapper, ApplicationMessageSearchRepository applicationMessageSearchRepository) {
        this.applicationMessageRepository = applicationMessageRepository;
        this.applicationMessageMapper = applicationMessageMapper;
        this.applicationMessageSearchRepository = applicationMessageSearchRepository;
    }

    /**
     * Save a applicationMessage.
     *
     * @param applicationMessageDTO the entity to save
     * @return the persisted entity
     */
    public ApplicationMessageDTO save(ApplicationMessageDTO applicationMessageDTO) {
        log.debug("Request to save ApplicationMessage : {}", applicationMessageDTO);
        ApplicationMessage applicationMessage = applicationMessageMapper.toEntity(applicationMessageDTO);
        applicationMessage = applicationMessageRepository.save(applicationMessage);
        ApplicationMessageDTO result = applicationMessageMapper.toDto(applicationMessage);
        applicationMessageSearchRepository.save(applicationMessage);
        return result;
    }

    /**
     * Get all the applicationMessages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ApplicationMessageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ApplicationMessages");
        return applicationMessageRepository.findAll(pageable)
            .map(applicationMessageMapper::toDto);
    }

    /**
     * Get one applicationMessage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ApplicationMessageDTO findOne(Long id) {
        log.debug("Request to get ApplicationMessage : {}", id);
        ApplicationMessage applicationMessage = applicationMessageRepository.findOne(id);
        return applicationMessageMapper.toDto(applicationMessage);
    }

    /**
     * Delete the applicationMessage by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ApplicationMessage : {}", id);
        applicationMessageRepository.delete(id);
        applicationMessageSearchRepository.delete(id);
    }

    /**
     * Search for the applicationMessage corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ApplicationMessageDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ApplicationMessages for query {}", query);
        Page<ApplicationMessage> result = applicationMessageSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(applicationMessageMapper::toDto);
    }

    /**
     * Finds all applications messages by application id
     * @param id the applcation id
     * @return the list of application messages
     */
    @Transactional(readOnly = true)
    public List<ApplicationMessageDTO> findAllByApplicationId(long id) {
        List<ApplicationMessageDTO> applicationMsgs = applicationMessageMapper.toDto(applicationMessageRepository.findAllByApplicationId(id));
        return applicationMsgs;
    }
}
