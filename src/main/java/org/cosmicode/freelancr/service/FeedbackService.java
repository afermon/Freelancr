package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Feedback;
import org.cosmicode.freelancr.repository.FeedbackRepository;
import org.cosmicode.freelancr.repository.search.FeedbackSearchRepository;
import org.cosmicode.freelancr.service.dto.FeedbackDTO;
import org.cosmicode.freelancr.service.mapper.FeedbackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Feedback.
 */
@Service
@Transactional
public class FeedbackService {

    private final Logger log = LoggerFactory.getLogger(FeedbackService.class);

    private final FeedbackRepository feedbackRepository;

    private final FeedbackMapper feedbackMapper;

    private final FeedbackSearchRepository feedbackSearchRepository;

    private final UserFreelancrService userFreelancrService;

    public FeedbackService(FeedbackRepository feedbackRepository, FeedbackMapper feedbackMapper, FeedbackSearchRepository feedbackSearchRepository, UserFreelancrService userFreelancrService) {
        this.feedbackRepository = feedbackRepository;
        this.feedbackMapper = feedbackMapper;
        this.feedbackSearchRepository = feedbackSearchRepository;
        this.userFreelancrService = userFreelancrService;
    }

    /**
     * Save a feedback.
     *
     * @param feedbackDTO the entity to save
     * @return the persisted entity
     */
    public FeedbackDTO save(FeedbackDTO feedbackDTO) {
        log.debug("Request to save Feedback : {}", feedbackDTO);
        Feedback feedback = feedbackMapper.toEntity(feedbackDTO);
        feedback = feedbackRepository.save(feedback);
        FeedbackDTO result = feedbackMapper.toDto(feedback);
        feedbackSearchRepository.save(feedback);

        return result;
    }

    /**
     * Get all the feedbacks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FeedbackDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Feedbacks");
        return feedbackRepository.findAll(pageable)
            .map(feedbackMapper::toDto);
    }

    /**
     * Get one feedback by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public FeedbackDTO findOne(Long id) {
        log.debug("Request to get Feedback : {}", id);
        Feedback feedback = feedbackRepository.findOne(id);
        return feedbackMapper.toDto(feedback);
    }

    /**
     * Delete the feedback by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Feedback : {}", id);
        feedbackRepository.delete(id);
        feedbackSearchRepository.delete(id);
    }

    /**
     * Search for the feedback corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FeedbackDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Feedbacks for query {}", query);
        Page<Feedback> result = feedbackSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(feedbackMapper::toDto);
    }


    /**
     * Gets all the feedback from a user
     * @param id the user id
     * @return the list of feedback
     */
    @Transactional(readOnly = true)
    public List<FeedbackDTO> getAllFeedbackById(Long id) {
        List<FeedbackDTO> feedbacks = feedbackMapper.toDto(feedbackRepository.findByUserId(id));
        return feedbacks;
    }

    /**
     * Updates the rating of a user
     * @param id the user id
     */
    @Transactional(readOnly = true)
    public void updateRating(Long id) {
        userFreelancrService.updateRating(id, feedbackRepository.getAvgRating(id));
    }

    /**
     * Check if feedback exists for a given project and user
     * @param uid the user id
     * @param pid the project id
     * @return the list of feedback
     */
    @Transactional
    public List<FeedbackDTO> checkIfFeedbackExists(Long uid, Long pid) {
        return feedbackMapper.toDto(feedbackRepository.checkIfFeedbackExists(uid, pid));
    }
}
