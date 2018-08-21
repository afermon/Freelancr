package org.cosmicode.freelancr.web.rest;

import org.cosmicode.freelancr.FreelancrApp;

import org.cosmicode.freelancr.domain.ApplicationMessage;
import org.cosmicode.freelancr.repository.ApplicationMessageRepository;
import org.cosmicode.freelancr.service.ApplicationMessageService;
import org.cosmicode.freelancr.repository.search.ApplicationMessageSearchRepository;
import org.cosmicode.freelancr.service.dto.ApplicationMessageDTO;
import org.cosmicode.freelancr.service.mapper.ApplicationMessageMapper;
import org.cosmicode.freelancr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.cosmicode.freelancr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.cosmicode.freelancr.domain.enumeration.MessageStatus;
/**
 * Test class for the ApplicationMessageResource REST controller.
 *
 * @see ApplicationMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FreelancrApp.class)
public class ApplicationMessageResourceIntTest {

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final MessageStatus DEFAULT_STATUS = MessageStatus.NEW;
    private static final MessageStatus UPDATED_STATUS = MessageStatus.READ;

    @Autowired
    private ApplicationMessageRepository applicationMessageRepository;

    @Autowired
    private ApplicationMessageMapper applicationMessageMapper;

    @Autowired
    private ApplicationMessageService applicationMessageService;

    @Autowired
    private ApplicationMessageSearchRepository applicationMessageSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restApplicationMessageMockMvc;

    private ApplicationMessage applicationMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApplicationMessageResource applicationMessageResource = new ApplicationMessageResource(applicationMessageService);
        this.restApplicationMessageMockMvc = MockMvcBuilders.standaloneSetup(applicationMessageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApplicationMessage createEntity(EntityManager em) {
        ApplicationMessage applicationMessage = new ApplicationMessage()
            .message(DEFAULT_MESSAGE)
            .status(DEFAULT_STATUS);
        return applicationMessage;
    }

    @Before
    public void initTest() {
        applicationMessageSearchRepository.deleteAll();
        applicationMessage = createEntity(em);
    }

    @Test
    @Transactional
    public void createApplicationMessage() throws Exception {
        int databaseSizeBeforeCreate = applicationMessageRepository.findAll().size();

        // Create the ApplicationMessage
        ApplicationMessageDTO applicationMessageDTO = applicationMessageMapper.toDto(applicationMessage);
        restApplicationMessageMockMvc.perform(post("/api/application-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationMessageDTO)))
            .andExpect(status().isCreated());

        // Validate the ApplicationMessage in the database
        List<ApplicationMessage> applicationMessageList = applicationMessageRepository.findAll();
        assertThat(applicationMessageList).hasSize(databaseSizeBeforeCreate + 1);
        ApplicationMessage testApplicationMessage = applicationMessageList.get(applicationMessageList.size() - 1);
        assertThat(testApplicationMessage.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testApplicationMessage.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the ApplicationMessage in Elasticsearch
        ApplicationMessage applicationMessageEs = applicationMessageSearchRepository.findOne(testApplicationMessage.getId());
        assertThat(applicationMessageEs).isEqualToIgnoringGivenFields(testApplicationMessage);
    }

    @Test
    @Transactional
    public void createApplicationMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationMessageRepository.findAll().size();

        // Create the ApplicationMessage with an existing ID
        applicationMessage.setId(1L);
        ApplicationMessageDTO applicationMessageDTO = applicationMessageMapper.toDto(applicationMessage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationMessageMockMvc.perform(post("/api/application-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationMessageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationMessage in the database
        List<ApplicationMessage> applicationMessageList = applicationMessageRepository.findAll();
        assertThat(applicationMessageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = applicationMessageRepository.findAll().size();
        // set the field null
        applicationMessage.setMessage(null);

        // Create the ApplicationMessage, which fails.
        ApplicationMessageDTO applicationMessageDTO = applicationMessageMapper.toDto(applicationMessage);

        restApplicationMessageMockMvc.perform(post("/api/application-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationMessageDTO)))
            .andExpect(status().isBadRequest());

        List<ApplicationMessage> applicationMessageList = applicationMessageRepository.findAll();
        assertThat(applicationMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = applicationMessageRepository.findAll().size();
        // set the field null
        applicationMessage.setStatus(null);

        // Create the ApplicationMessage, which fails.
        ApplicationMessageDTO applicationMessageDTO = applicationMessageMapper.toDto(applicationMessage);

        restApplicationMessageMockMvc.perform(post("/api/application-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationMessageDTO)))
            .andExpect(status().isBadRequest());

        List<ApplicationMessage> applicationMessageList = applicationMessageRepository.findAll();
        assertThat(applicationMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllApplicationMessages() throws Exception {
        // Initialize the database
        applicationMessageRepository.saveAndFlush(applicationMessage);

        // Get all the applicationMessageList
        restApplicationMessageMockMvc.perform(get("/api/application-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicationMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getApplicationMessage() throws Exception {
        // Initialize the database
        applicationMessageRepository.saveAndFlush(applicationMessage);

        // Get the applicationMessage
        restApplicationMessageMockMvc.perform(get("/api/application-messages/{id}", applicationMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(applicationMessage.getId().intValue()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingApplicationMessage() throws Exception {
        // Get the applicationMessage
        restApplicationMessageMockMvc.perform(get("/api/application-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplicationMessage() throws Exception {
        // Initialize the database
        applicationMessageRepository.saveAndFlush(applicationMessage);
        applicationMessageSearchRepository.save(applicationMessage);
        int databaseSizeBeforeUpdate = applicationMessageRepository.findAll().size();

        // Update the applicationMessage
        ApplicationMessage updatedApplicationMessage = applicationMessageRepository.findOne(applicationMessage.getId());
        // Disconnect from session so that the updates on updatedApplicationMessage are not directly saved in db
        em.detach(updatedApplicationMessage);
        updatedApplicationMessage
            .message(UPDATED_MESSAGE)
            .status(UPDATED_STATUS);
        ApplicationMessageDTO applicationMessageDTO = applicationMessageMapper.toDto(updatedApplicationMessage);

        restApplicationMessageMockMvc.perform(put("/api/application-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationMessageDTO)))
            .andExpect(status().isOk());

        // Validate the ApplicationMessage in the database
        List<ApplicationMessage> applicationMessageList = applicationMessageRepository.findAll();
        assertThat(applicationMessageList).hasSize(databaseSizeBeforeUpdate);
        ApplicationMessage testApplicationMessage = applicationMessageList.get(applicationMessageList.size() - 1);
        assertThat(testApplicationMessage.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testApplicationMessage.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the ApplicationMessage in Elasticsearch
        ApplicationMessage applicationMessageEs = applicationMessageSearchRepository.findOne(testApplicationMessage.getId());
        assertThat(applicationMessageEs).isEqualToIgnoringGivenFields(testApplicationMessage);
    }

    @Test
    @Transactional
    public void updateNonExistingApplicationMessage() throws Exception {
        int databaseSizeBeforeUpdate = applicationMessageRepository.findAll().size();

        // Create the ApplicationMessage
        ApplicationMessageDTO applicationMessageDTO = applicationMessageMapper.toDto(applicationMessage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restApplicationMessageMockMvc.perform(put("/api/application-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationMessageDTO)))
            .andExpect(status().isCreated());

        // Validate the ApplicationMessage in the database
        List<ApplicationMessage> applicationMessageList = applicationMessageRepository.findAll();
        assertThat(applicationMessageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteApplicationMessage() throws Exception {
        // Initialize the database
        applicationMessageRepository.saveAndFlush(applicationMessage);
        applicationMessageSearchRepository.save(applicationMessage);
        int databaseSizeBeforeDelete = applicationMessageRepository.findAll().size();

        // Get the applicationMessage
        restApplicationMessageMockMvc.perform(delete("/api/application-messages/{id}", applicationMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean applicationMessageExistsInEs = applicationMessageSearchRepository.exists(applicationMessage.getId());
        assertThat(applicationMessageExistsInEs).isFalse();

        // Validate the database is empty
        List<ApplicationMessage> applicationMessageList = applicationMessageRepository.findAll();
        assertThat(applicationMessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchApplicationMessage() throws Exception {
        // Initialize the database
        applicationMessageRepository.saveAndFlush(applicationMessage);
        applicationMessageSearchRepository.save(applicationMessage);

        // Search the applicationMessage
        restApplicationMessageMockMvc.perform(get("/api/_search/application-messages?query=id:" + applicationMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicationMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApplicationMessage.class);
        ApplicationMessage applicationMessage1 = new ApplicationMessage();
        applicationMessage1.setId(1L);
        ApplicationMessage applicationMessage2 = new ApplicationMessage();
        applicationMessage2.setId(applicationMessage1.getId());
        assertThat(applicationMessage1).isEqualTo(applicationMessage2);
        applicationMessage2.setId(2L);
        assertThat(applicationMessage1).isNotEqualTo(applicationMessage2);
        applicationMessage1.setId(null);
        assertThat(applicationMessage1).isNotEqualTo(applicationMessage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApplicationMessageDTO.class);
        ApplicationMessageDTO applicationMessageDTO1 = new ApplicationMessageDTO();
        applicationMessageDTO1.setId(1L);
        ApplicationMessageDTO applicationMessageDTO2 = new ApplicationMessageDTO();
        assertThat(applicationMessageDTO1).isNotEqualTo(applicationMessageDTO2);
        applicationMessageDTO2.setId(applicationMessageDTO1.getId());
        assertThat(applicationMessageDTO1).isEqualTo(applicationMessageDTO2);
        applicationMessageDTO2.setId(2L);
        assertThat(applicationMessageDTO1).isNotEqualTo(applicationMessageDTO2);
        applicationMessageDTO1.setId(null);
        assertThat(applicationMessageDTO1).isNotEqualTo(applicationMessageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(applicationMessageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(applicationMessageMapper.fromId(null)).isNull();
    }
}
