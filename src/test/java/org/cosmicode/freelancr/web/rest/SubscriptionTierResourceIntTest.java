package org.cosmicode.freelancr.web.rest;

import org.cosmicode.freelancr.FreelancrApp;

import org.cosmicode.freelancr.domain.SubscriptionTier;
import org.cosmicode.freelancr.repository.SubscriptionTierRepository;
import org.cosmicode.freelancr.service.SubscriptionTierService;
import org.cosmicode.freelancr.repository.search.SubscriptionTierSearchRepository;
import org.cosmicode.freelancr.service.dto.SubscriptionTierDTO;
import org.cosmicode.freelancr.service.mapper.SubscriptionTierMapper;
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

/**
 * Test class for the SubscriptionTierResource REST controller.
 *
 * @see SubscriptionTierResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FreelancrApp.class)
public class SubscriptionTierResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 0D;
    private static final Double UPDATED_PRICE = 1D;

    @Autowired
    private SubscriptionTierRepository subscriptionTierRepository;

    @Autowired
    private SubscriptionTierMapper subscriptionTierMapper;

    @Autowired
    private SubscriptionTierService subscriptionTierService;

    @Autowired
    private SubscriptionTierSearchRepository subscriptionTierSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubscriptionTierMockMvc;

    private SubscriptionTier subscriptionTier;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscriptionTierResource subscriptionTierResource = new SubscriptionTierResource(subscriptionTierService);
        this.restSubscriptionTierMockMvc = MockMvcBuilders.standaloneSetup(subscriptionTierResource)
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
    public static SubscriptionTier createEntity(EntityManager em) {
        SubscriptionTier subscriptionTier = new SubscriptionTier()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .price(DEFAULT_PRICE);
        return subscriptionTier;
    }

    @Before
    public void initTest() {
        subscriptionTierSearchRepository.deleteAll();
        subscriptionTier = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptionTier() throws Exception {
        int databaseSizeBeforeCreate = subscriptionTierRepository.findAll().size();

        // Create the SubscriptionTier
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierMapper.toDto(subscriptionTier);
        restSubscriptionTierMockMvc.perform(post("/api/subscription-tiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionTierDTO)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionTier in the database
        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeCreate + 1);
        SubscriptionTier testSubscriptionTier = subscriptionTierList.get(subscriptionTierList.size() - 1);
        assertThat(testSubscriptionTier.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubscriptionTier.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSubscriptionTier.getPrice()).isEqualTo(DEFAULT_PRICE);

        // Validate the SubscriptionTier in Elasticsearch
        SubscriptionTier subscriptionTierEs = subscriptionTierSearchRepository.findOne(testSubscriptionTier.getId());
        assertThat(subscriptionTierEs).isEqualToIgnoringGivenFields(testSubscriptionTier);
    }

    @Test
    @Transactional
    public void createSubscriptionTierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptionTierRepository.findAll().size();

        // Create the SubscriptionTier with an existing ID
        subscriptionTier.setId(1L);
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierMapper.toDto(subscriptionTier);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionTierMockMvc.perform(post("/api/subscription-tiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionTierDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionTier in the database
        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionTierRepository.findAll().size();
        // set the field null
        subscriptionTier.setName(null);

        // Create the SubscriptionTier, which fails.
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierMapper.toDto(subscriptionTier);

        restSubscriptionTierMockMvc.perform(post("/api/subscription-tiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionTierDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionTierRepository.findAll().size();
        // set the field null
        subscriptionTier.setDescription(null);

        // Create the SubscriptionTier, which fails.
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierMapper.toDto(subscriptionTier);

        restSubscriptionTierMockMvc.perform(post("/api/subscription-tiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionTierDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionTierRepository.findAll().size();
        // set the field null
        subscriptionTier.setPrice(null);

        // Create the SubscriptionTier, which fails.
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierMapper.toDto(subscriptionTier);

        restSubscriptionTierMockMvc.perform(post("/api/subscription-tiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionTierDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubscriptionTiers() throws Exception {
        // Initialize the database
        subscriptionTierRepository.saveAndFlush(subscriptionTier);

        // Get all the subscriptionTierList
        restSubscriptionTierMockMvc.perform(get("/api/subscription-tiers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionTier.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }

    @Test
    @Transactional
    public void getSubscriptionTier() throws Exception {
        // Initialize the database
        subscriptionTierRepository.saveAndFlush(subscriptionTier);

        // Get the subscriptionTier
        restSubscriptionTierMockMvc.perform(get("/api/subscription-tiers/{id}", subscriptionTier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionTier.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubscriptionTier() throws Exception {
        // Get the subscriptionTier
        restSubscriptionTierMockMvc.perform(get("/api/subscription-tiers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptionTier() throws Exception {
        // Initialize the database
        subscriptionTierRepository.saveAndFlush(subscriptionTier);
        subscriptionTierSearchRepository.save(subscriptionTier);
        int databaseSizeBeforeUpdate = subscriptionTierRepository.findAll().size();

        // Update the subscriptionTier
        SubscriptionTier updatedSubscriptionTier = subscriptionTierRepository.findOne(subscriptionTier.getId());
        // Disconnect from session so that the updates on updatedSubscriptionTier are not directly saved in db
        em.detach(updatedSubscriptionTier);
        updatedSubscriptionTier
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .price(UPDATED_PRICE);
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierMapper.toDto(updatedSubscriptionTier);

        restSubscriptionTierMockMvc.perform(put("/api/subscription-tiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionTierDTO)))
            .andExpect(status().isOk());

        // Validate the SubscriptionTier in the database
        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeUpdate);
        SubscriptionTier testSubscriptionTier = subscriptionTierList.get(subscriptionTierList.size() - 1);
        assertThat(testSubscriptionTier.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubscriptionTier.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSubscriptionTier.getPrice()).isEqualTo(UPDATED_PRICE);

        // Validate the SubscriptionTier in Elasticsearch
        SubscriptionTier subscriptionTierEs = subscriptionTierSearchRepository.findOne(testSubscriptionTier.getId());
        assertThat(subscriptionTierEs).isEqualToIgnoringGivenFields(testSubscriptionTier);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptionTier() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionTierRepository.findAll().size();

        // Create the SubscriptionTier
        SubscriptionTierDTO subscriptionTierDTO = subscriptionTierMapper.toDto(subscriptionTier);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubscriptionTierMockMvc.perform(put("/api/subscription-tiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionTierDTO)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionTier in the database
        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubscriptionTier() throws Exception {
        // Initialize the database
        subscriptionTierRepository.saveAndFlush(subscriptionTier);
        subscriptionTierSearchRepository.save(subscriptionTier);
        int databaseSizeBeforeDelete = subscriptionTierRepository.findAll().size();

        // Get the subscriptionTier
        restSubscriptionTierMockMvc.perform(delete("/api/subscription-tiers/{id}", subscriptionTier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean subscriptionTierExistsInEs = subscriptionTierSearchRepository.exists(subscriptionTier.getId());
        assertThat(subscriptionTierExistsInEs).isFalse();

        // Validate the database is empty
        List<SubscriptionTier> subscriptionTierList = subscriptionTierRepository.findAll();
        assertThat(subscriptionTierList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSubscriptionTier() throws Exception {
        // Initialize the database
        subscriptionTierRepository.saveAndFlush(subscriptionTier);
        subscriptionTierSearchRepository.save(subscriptionTier);

        // Search the subscriptionTier
        restSubscriptionTierMockMvc.perform(get("/api/_search/subscription-tiers?query=id:" + subscriptionTier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionTier.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionTier.class);
        SubscriptionTier subscriptionTier1 = new SubscriptionTier();
        subscriptionTier1.setId(1L);
        SubscriptionTier subscriptionTier2 = new SubscriptionTier();
        subscriptionTier2.setId(subscriptionTier1.getId());
        assertThat(subscriptionTier1).isEqualTo(subscriptionTier2);
        subscriptionTier2.setId(2L);
        assertThat(subscriptionTier1).isNotEqualTo(subscriptionTier2);
        subscriptionTier1.setId(null);
        assertThat(subscriptionTier1).isNotEqualTo(subscriptionTier2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionTierDTO.class);
        SubscriptionTierDTO subscriptionTierDTO1 = new SubscriptionTierDTO();
        subscriptionTierDTO1.setId(1L);
        SubscriptionTierDTO subscriptionTierDTO2 = new SubscriptionTierDTO();
        assertThat(subscriptionTierDTO1).isNotEqualTo(subscriptionTierDTO2);
        subscriptionTierDTO2.setId(subscriptionTierDTO1.getId());
        assertThat(subscriptionTierDTO1).isEqualTo(subscriptionTierDTO2);
        subscriptionTierDTO2.setId(2L);
        assertThat(subscriptionTierDTO1).isNotEqualTo(subscriptionTierDTO2);
        subscriptionTierDTO1.setId(null);
        assertThat(subscriptionTierDTO1).isNotEqualTo(subscriptionTierDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subscriptionTierMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subscriptionTierMapper.fromId(null)).isNull();
    }
}
