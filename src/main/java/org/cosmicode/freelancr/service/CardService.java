package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Card;
import org.cosmicode.freelancr.domain.Project;
import org.cosmicode.freelancr.domain.enumeration.CardStatus;
import org.cosmicode.freelancr.repository.CardRepository;
import org.cosmicode.freelancr.repository.search.CardSearchRepository;
import org.cosmicode.freelancr.service.dto.CardDTO;
import org.cosmicode.freelancr.service.dto.ProjectDTO;
import org.cosmicode.freelancr.service.mapper.CardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Card.
 */
@Service
@Transactional
public class CardService {

    private final Logger log = LoggerFactory.getLogger(CardService.class);

    private final CardRepository cardRepository;

    private final CardMapper cardMapper;

    private final CardSearchRepository cardSearchRepository;

    private final SlackIntegrationService slackIntegrationService;

    private final PaypalIntegrationService paypalIntegrationService;

    private final ProjectService projectService;

    public CardService(CardRepository cardRepository, CardMapper cardMapper, CardSearchRepository cardSearchRepository, SlackIntegrationService slackIntegrationService, PaypalIntegrationService paypalIntegrationService, ProjectService projectService
    ) {
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
        this.cardSearchRepository = cardSearchRepository;
        this.slackIntegrationService = slackIntegrationService;
        this.paypalIntegrationService = paypalIntegrationService;
        this.projectService = projectService;
    }

    /**
     * Save a card.
     *
     * @param cardDTO the entity to save
     * @return the persisted entity
     */
    public CardDTO save(CardDTO cardDTO) {
        log.debug("Request to save Card : {}", cardDTO);
        Card card = cardMapper.toEntity(cardDTO);
        try {
            ProjectDTO project = projectService.findOne(cardDTO.getProjectId());
            slackIntegrationService.sendMessageChannel(project.getSlackChannel(), getSlackMessage(cardDTO));
        } catch (Exception e){
            log.error(e.getMessage());
        }
        card = cardRepository.save(card);
        if (cardDTO.getStatus() == CardStatus.CLOSED) {
            paypalIntegrationService.payoutFreelancerCardCompleted(card);
        }
        CardDTO result = cardMapper.toDto(card);
        cardSearchRepository.save(card);
        return result;
    }

    private String getSlackMessage(CardDTO card){
        String msg="";
        switch (card.getStatus().toString()){
            case "NEW":
                msg = "A new card has been created with the title " + card.getTitle() + ". \n User: " + card.getUserLogin() + " \n Deadline: " + card.getDeadline();
                break;
            case "IN_PROGRESS":
                msg = "The card " + card.getTitle() + " has been updated." + "\n Status: In progress " + "\n User: " + card.getUserLogin() + " \n Deadline: " + card.getDeadline();
                break;
            case "RESOLVED":
                msg = "The card " + card.getTitle() + " has been updated." + "\n Status: Verification pending " + "\n User: " + card.getUserLogin() + " \n Deadline: " + card.getDeadline();
                break;
            case "CLOSED":
                msg = "The card " + card.getTitle() + " has been marked as resolved." + "\n User: " + card.getUserLogin() + " \n Deadline: " + card.getDeadline();
                break;
        }

        return msg;
    }

    /**
     * Get all the cards.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CardDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cards");
        return cardRepository.findAll(pageable)
            .map(cardMapper::toDto);
    }

    /**
     * Get one card by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CardDTO findOne(Long id) {
        log.debug("Request to get Card : {}", id);
        Card card = cardRepository.findOne(id);
        return cardMapper.toDto(card);
    }

    /**
     * Delete the card by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Card : {}", id);
        cardRepository.delete(id);
        cardSearchRepository.delete(id);
    }

    /**
     * Search for the card corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CardDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Cards for query {}", query);
        Page<Card> result = cardSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(cardMapper::toDto);
    }

    /**
     * Gets all the cards by its project id
     * @param id The id of project
     * @return The list of cards
     */
    @Transactional(readOnly = true)
    public List<CardDTO> getByProject(Long id){
        return cardMapper.toDto(cardRepository.findByProjectId(id));
    }

    public Long findAssignedCards(){
        Long count = cardRepository.countAssignedCards();
        return count;
    }

}
