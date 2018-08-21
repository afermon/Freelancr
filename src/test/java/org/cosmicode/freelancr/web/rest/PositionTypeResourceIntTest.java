package org.cosmicode.freelancr.web.rest;

import org.cosmicode.freelancr.FreelancrApp;

import org.cosmicode.freelancr.domain.PositionType;
import org.cosmicode.freelancr.repository.PositionTypeRepository;
import org.cosmicode.freelancr.service.PositionTypeService;
import org.cosmicode.freelancr.repository.search.PositionTypeSearchRepository;
import org.cosmicode.freelancr.service.dto.PositionTypeDTO;
import org.cosmicode.freelancr.service.mapper.PositionTypeMapper;
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
 * Test class for the PositionTypeResource REST controller.
 *
 * @see PositionTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FreelancrApp.class)
public class PositionTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PositionTypeRepository positionTypeRepository;

    @Autowired
    private PositionTypeMapper positionTypeMapper;

    @Autowired
    private PositionTypeService positionTypeService;

    @Autowired
    private PositionTypeSearchRepository positionTypeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPositionTypeMockMvc;

    private PositionType positionType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PositionTypeResource positionTypeResource = new PositionTypeResource(positionTypeService);
        this.restPositionTypeMockMvc = MockMvcBuilders.standaloneSetup(positionTypeResource)
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
    public static PositionType createEntity(EntityManager em) {
        PositionType positionType = new PositionType()
            .name(DEFAULT_NAME);
        return positionType;
    }

    @Before
    public void initTest() {
        positionTypeSearchRepository.deleteAll();
        positionType = createEntity(em);
    }

    @Test
    @Transactional
    public void createPositionType() throws Exception {
        int databaseSizeBeforeCreate = positionTypeRepository.findAll().size();

        // Create the PositionType
        PositionTypeDTO positionTypeDTO = positionTypeMapper.toDto(positionType);
        restPositionTypeMockMvc.perform(post("/api/position-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the PositionType in the database
        List<PositionType> positionTypeList = positionTypeRepository.findAll();
        assertThat(positionTypeList).hasSize(databaseSizeBeforeCreate + 1);
        PositionType testPositionType = positionTypeList.get(positionTypeList.size() - 1);
        assertThat(testPositionType.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the PositionType in Elasticsearch
        PositionType positionTypeEs = positionTypeSearchRepository.findOne(testPositionType.getId());
        assertThat(positionTypeEs).isEqualToIgnoringGivenFields(testPositionType);
    }

    @Test
    @Transactional
    public void createPositionTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = positionTypeRepository.findAll().size();

        // Create the PositionType with an existing ID
        positionType.setId(1L);
        PositionTypeDTO positionTypeDTO = positionTypeMapper.toDto(positionType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPositionTypeMockMvc.perform(post("/api/position-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PositionType in the database
        List<PositionType> positionTypeList = positionTypeRepository.findAll();
        assertThat(positionTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = positionTypeRepository.findAll().size();
        // set the field null
        positionType.setName(null);

        // Create the PositionType, which fails.
        PositionTypeDTO positionTypeDTO = positionTypeMapper.toDto(positionType);

        restPositionTypeMockMvc.perform(post("/api/position-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionTypeDTO)))
            .andExpect(status().isBadRequest());

        List<PositionType> positionTypeList = positionTypeRepository.findAll();
        assertThat(positionTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPositionTypes() throws Exception {
        // Initialize the database
        positionTypeRepository.saveAndFlush(positionType);

        // Get all the positionTypeList
        restPositionTypeMockMvc.perform(get("/api/position-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(positionType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getPositionType() throws Exception {
        // Initialize the database
        positionTypeRepository.saveAndFlush(positionType);

        // Get the positionType
        restPositionTypeMockMvc.perform(get("/api/position-types/{id}", positionType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(positionType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPositionType() throws Exception {
        // Get the positionType
        restPositionTypeMockMvc.perform(get("/api/position-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePositionType() throws Exception {
        // Initialize the database
        positionTypeRepository.saveAndFlush(positionType);
        positionTypeSearchRepository.save(positionType);
        int databaseSizeBeforeUpdate = positionTypeRepository.findAll().size();

        // Update the positionType
        PositionType updatedPositionType = positionTypeRepository.findOne(positionType.getId());
        // Disconnect from session so that the updates on updatedPositionType are not directly saved in db
        em.detach(updatedPositionType);
        updatedPositionType
            .name(UPDATED_NAME);
        PositionTypeDTO positionTypeDTO = positionTypeMapper.toDto(updatedPositionType);

        restPositionTypeMockMvc.perform(put("/api/position-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionTypeDTO)))
            .andExpect(status().isOk());

        // Validate the PositionType in the database
        List<PositionType> positionTypeList = positionTypeRepository.findAll();
        assertThat(positionTypeList).hasSize(databaseSizeBeforeUpdate);
        PositionType testPositionType = positionTypeList.get(positionTypeList.size() - 1);
        assertThat(testPositionType.getName()).isEqualTo(UPDATED_NAME);

        // Validate the PositionType in Elasticsearch
        PositionType positionTypeEs = positionTypeSearchRepository.findOne(testPositionType.getId());
        assertThat(positionTypeEs).isEqualToIgnoringGivenFields(testPositionType);
    }

    @Test
    @Transactional
    public void updateNonExistingPositionType() throws Exception {
        int databaseSizeBeforeUpdate = positionTypeRepository.findAll().size();

        // Create the PositionType
        PositionTypeDTO positionTypeDTO = positionTypeMapper.toDto(positionType);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPositionTypeMockMvc.perform(put("/api/position-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the PositionType in the database
        List<PositionType> positionTypeList = positionTypeRepository.findAll();
        assertThat(positionTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePositionType() throws Exception {
        // Initialize the database
        positionTypeRepository.saveAndFlush(positionType);
        positionTypeSearchRepository.save(positionType);
        int databaseSizeBeforeDelete = positionTypeRepository.findAll().size();

        // Get the positionType
        restPositionTypeMockMvc.perform(delete("/api/position-types/{id}", positionType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean positionTypeExistsInEs = positionTypeSearchRepository.exists(positionType.getId());
        assertThat(positionTypeExistsInEs).isFalse();

        // Validate the database is empty
        List<PositionType> positionTypeList = positionTypeRepository.findAll();
        assertThat(positionTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPositionType() throws Exception {
        // Initialize the database
        positionTypeRepository.saveAndFlush(positionType);
        positionTypeSearchRepository.save(positionType);

        // Search the positionType
        restPositionTypeMockMvc.perform(get("/api/_search/position-types?query=id:" + positionType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(positionType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PositionType.class);
        PositionType positionType1 = new PositionType();
        positionType1.setId(1L);
        PositionType positionType2 = new PositionType();
        positionType2.setId(positionType1.getId());
        assertThat(positionType1).isEqualTo(positionType2);
        positionType2.setId(2L);
        assertThat(positionType1).isNotEqualTo(positionType2);
        positionType1.setId(null);
        assertThat(positionType1).isNotEqualTo(positionType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PositionTypeDTO.class);
        PositionTypeDTO positionTypeDTO1 = new PositionTypeDTO();
        positionTypeDTO1.setId(1L);
        PositionTypeDTO positionTypeDTO2 = new PositionTypeDTO();
        assertThat(positionTypeDTO1).isNotEqualTo(positionTypeDTO2);
        positionTypeDTO2.setId(positionTypeDTO1.getId());
        assertThat(positionTypeDTO1).isEqualTo(positionTypeDTO2);
        positionTypeDTO2.setId(2L);
        assertThat(positionTypeDTO1).isNotEqualTo(positionTypeDTO2);
        positionTypeDTO1.setId(null);
        assertThat(positionTypeDTO1).isNotEqualTo(positionTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(positionTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(positionTypeMapper.fromId(null)).isNull();
    }
}
