package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Application;
import org.cosmicode.freelancr.repository.ApplicationRepository;
import org.cosmicode.freelancr.repository.search.ApplicationSearchRepository;
import org.cosmicode.freelancr.service.dto.ApplicationDTO;
import org.cosmicode.freelancr.service.mapper.ApplicationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Application.
 */
@Service
@Transactional
public class ApplicationService {

    private final Logger log = LoggerFactory.getLogger(ApplicationService.class);

    private final ApplicationRepository applicationRepository;

    private final ApplicationMapper applicationMapper;

    private final ApplicationSearchRepository applicationSearchRepository;

    public ApplicationService(ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ApplicationSearchRepository applicationSearchRepository) {
        this.applicationRepository = applicationRepository;
        this.applicationMapper = applicationMapper;
        this.applicationSearchRepository = applicationSearchRepository;
    }

    /**
     * Save a application.
     *
     * @param applicationDTO the entity to save
     * @return the persisted entity
     */
    public ApplicationDTO save(ApplicationDTO applicationDTO) {
        log.debug("Request to save Application : {}", applicationDTO);
        Application application = applicationMapper.toEntity(applicationDTO);
        application = applicationRepository.save(application);
        ApplicationDTO result = applicationMapper.toDto(application);
        applicationSearchRepository.save(application);
        return result;
    }

    /**
     * Get all the applications.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ApplicationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Applications");
        return applicationRepository.findAll(pageable)
            .map(applicationMapper::toDto);
    }

    /**
     * Get one application by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ApplicationDTO findOne(Long id) {
        log.debug("Request to get Application : {}", id);
        Application application = applicationRepository.findOne(id);
        return applicationMapper.toDto(application);
    }

    /**
     * Delete the application by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Application : {}", id);
        applicationRepository.delete(id);
        applicationSearchRepository.delete(id);
    }

    /**
     * Search for the application corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ApplicationDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Applications for query {}", query);
        Page<Application> result = applicationSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(applicationMapper::toDto);
    }

    /**
     * Finds all applications by project id
     * @param id the project id
     * @return the list of applications
     */
    @Transactional(readOnly = true)
    public List<ApplicationDTO> findAllByProjectId(long id) {
        List<ApplicationDTO> applications = applicationMapper.toDto(applicationRepository.findByProject(id));
        return applications;
    }


    /**
     * Finds all the applications of the current logged user
     * @return the list of applications
     */
    @Transactional(readOnly = true)
    public List<ApplicationDTO> findAllByCurrentUser() {
        List<ApplicationDTO> applications = applicationMapper.toDto(applicationRepository.findByUserIsCurrentUser());
        return applications;
    }

    /**
     * Finds all the offered applications of the user id
     * @param id the user id
     * @return the list of applications
     */
    @Transactional(readOnly = true)
    public List<ApplicationDTO> findOfferedApplications(long id) {
        List<ApplicationDTO> applications = applicationMapper.toDto(applicationRepository.findOfferedApplications(id));
        return applications;
    }


}
