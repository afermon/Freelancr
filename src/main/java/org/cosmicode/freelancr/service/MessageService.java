package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Message;
import org.cosmicode.freelancr.domain.User;
import org.cosmicode.freelancr.domain.enumeration.MessageStatus;
import org.cosmicode.freelancr.repository.MessageRepository;
import org.cosmicode.freelancr.repository.search.MessageSearchRepository;
import org.cosmicode.freelancr.service.dto.MessageDTO;
import org.cosmicode.freelancr.service.dto.UserDTO;
import org.cosmicode.freelancr.service.mapper.MessageMapper;
import org.cosmicode.freelancr.service.mapper.UserMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Message.
 */
@Service
@Transactional
public class MessageService {

    private final Logger log = LoggerFactory.getLogger(MessageService.class);

    private final MessageRepository messageRepository;

    private final MessageMapper messageMapper;

    private final UserMapper userMapper;

    private final MessageSearchRepository messageSearchRepository;

    public MessageService(MessageRepository messageRepository, MessageMapper messageMapper, MessageSearchRepository messageSearchRepository, UserMapper userMapper) {
        this.messageRepository = messageRepository;
        this.messageMapper = messageMapper;
        this.messageSearchRepository = messageSearchRepository;
        this.userMapper = userMapper;
    }

    /**
     * Save a message.
     *
     * @param messageDTO the entity to save
     * @return the persisted entity
     */
    public MessageDTO save(MessageDTO messageDTO) {
        log.debug("Request to save Message : {}", messageDTO);
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Message message = messageMapper.toEntity(messageDTO);
        message = messageRepository.save(message);
        MessageDTO result = messageMapper.toDto(message);
        messageSearchRepository.save(message);
        return result;
    }

    /**
     * Get all the messages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MessageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Messages");
        return messageRepository.findAll(pageable)
            .map(messageMapper::toDto);
    }


    @Transactional(readOnly = true)
    public Page<MessageDTO> findAllByReceiver(Pageable pageable) {
        List<MessageDTO> msgs = messageMapper.toDto(messageRepository.findByReceiverIsCurrentUser());
        Page<MessageDTO> page = new PageImpl<>(msgs, pageable, msgs.size());
        return page;
    }

    /**
     * Get one message by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public MessageDTO findOne(Long id) {
        log.debug("Request to get Message : {}", id);
        Message message = messageRepository.findOne(id);
        return messageMapper.toDto(message);
    }

    /**
     * Delete the message by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Message : {}", id);
        messageRepository.delete(id);
        messageSearchRepository.delete(id);
    }

    /**
     * Search for the message corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MessageDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Messages for query {}", query);
        Page<Message> result = messageSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(messageMapper::toDto);
    }

    /**
     * Finds all received messages of the current logged user
     * @return the list of messages
     */
    public List<MessageDTO> findAllByCurrentLogin() {
        List<MessageDTO> messages = messageMapper.toDto(messageRepository.findByReceiverIsCurrentUser());
        return messages;
    }

    /**
     * Finds all sent messages of the current logged user
     * @return the list of messages
     */
    public List<MessageDTO> findAllMessagesBySender() {
        List<MessageDTO> messages = messageMapper.toDto(messageRepository.findBySenderIsCurrentUser());
        return messages;
    }

    public Long findUnreadMessages(){
        Long count = messageRepository.findUnreadMessages();
        return count;
    }
}
