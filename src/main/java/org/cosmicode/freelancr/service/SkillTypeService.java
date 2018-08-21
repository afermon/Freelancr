package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.SkillType;
import org.cosmicode.freelancr.repository.SkillTypeRepository;
import org.cosmicode.freelancr.repository.search.SkillTypeSearchRepository;
import org.cosmicode.freelancr.service.dto.SkillTypeDTO;
import org.cosmicode.freelancr.service.mapper.SkillTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing SkillType.
 */
@Service
@Transactional
public class SkillTypeService {

    private final Logger log = LoggerFactory.getLogger(SkillTypeService.class);

    private final SkillTypeRepository skillTypeRepository;

    private final SkillTypeMapper skillTypeMapper;

    private final SkillTypeSearchRepository skillTypeSearchRepository;

    public SkillTypeService(SkillTypeRepository skillTypeRepository, SkillTypeMapper skillTypeMapper, SkillTypeSearchRepository skillTypeSearchRepository) {
        this.skillTypeRepository = skillTypeRepository;
        this.skillTypeMapper = skillTypeMapper;
        this.skillTypeSearchRepository = skillTypeSearchRepository;
    }

    /**
     * Save a skillType.
     *
     * @param skillTypeDTO the entity to save
     * @return the persisted entity
     */
    public SkillTypeDTO save(SkillTypeDTO skillTypeDTO) {
        log.debug("Request to save SkillType : {}", skillTypeDTO);
        SkillType skillType = skillTypeMapper.toEntity(skillTypeDTO);
        skillType = skillTypeRepository.save(skillType);
        SkillTypeDTO result = skillTypeMapper.toDto(skillType);
        skillTypeSearchRepository.save(skillType);
        return result;
    }

    /**
     * Get all the skillTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SkillTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SkillTypes");
        return skillTypeRepository.findAll(pageable)
            .map(skillTypeMapper::toDto);
    }

    /**
     * Get one skillType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SkillTypeDTO findOne(Long id) {
        log.debug("Request to get SkillType : {}", id);
        SkillType skillType = skillTypeRepository.findOne(id);
        return skillTypeMapper.toDto(skillType);
    }

    /**
     * Delete the skillType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SkillType : {}", id);
        skillTypeRepository.delete(id);
        skillTypeSearchRepository.delete(id);
    }

    /**
     * Search for the skillType corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SkillTypeDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of SkillTypes for query {}", query);
        Page<SkillType> result = skillTypeSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(skillTypeMapper::toDto);
    }

    /**
     * Finds all the skills by name
     * @param name the name of the skill tpye
     * @return the lis of  skill types
     */
    @Transactional(readOnly = true)
    public List<SkillTypeDTO> findAllBySkillName(String name) {
        List<SkillTypeDTO> skillTypes = skillTypeMapper.toDto(skillTypeRepository.findBySTypeName(name));
        return skillTypes;
    }
}
