package org.cosmicode.freelancr.service;

import org.cosmicode.freelancr.domain.Skill;
import org.cosmicode.freelancr.repository.SkillRepository;
import org.cosmicode.freelancr.repository.search.SkillSearchRepository;
import org.cosmicode.freelancr.service.dto.SkillDTO;
import org.cosmicode.freelancr.service.mapper.SkillMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import org.springframework.data.domain.PageImpl;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Skill.
 */
@Service
@Transactional
public class SkillService {

    private final Logger log = LoggerFactory.getLogger(SkillService.class);

    private final SkillRepository skillRepository;

    private final SkillMapper skillMapper;

    private final SkillSearchRepository skillSearchRepository;

    public SkillService(SkillRepository skillRepository, SkillMapper skillMapper, SkillSearchRepository skillSearchRepository) {
        this.skillRepository = skillRepository;
        this.skillMapper = skillMapper;
        this.skillSearchRepository = skillSearchRepository;
    }

    /**
     * Save a skill.
     *
     * @param skillDTO the entity to save
     * @return the persisted entity
     */
    public SkillDTO save(SkillDTO skillDTO) {
        log.debug("Request to save Skill : {}", skillDTO);
        Skill skill = skillMapper.toEntity(skillDTO);
        skill = skillRepository.save(skill);
        SkillDTO result = skillMapper.toDto(skill);
        skillSearchRepository.save(skill);
        return result;
    }

    /**
     * Get all the skills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SkillDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Skills");
        return skillRepository.findAll(pageable)
            .map(skillMapper::toDto);
    }

    /**
     * Get one skill by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SkillDTO findOne(Long id) {
        log.debug("Request to get Skill : {}", id);
        Skill skill = skillRepository.findOneWithEagerRelationships(id);
        return skillMapper.toDto(skill);
    }

    /**
     * Delete the skill by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Skill : {}", id);
        skillRepository.delete(id);
        skillSearchRepository.delete(id);
    }

    /**
     * Search for the skill corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SkillDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Skills for query {}", query);
        Page<Skill> result = skillSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(skillMapper::toDto);
    }

    /**
     * Finds all the skills assigned to the current logged user
     * @return the list of skills
     */
    @Transactional(readOnly = true)
    public List<SkillDTO> findAllByCurrentLogin() {
        List<SkillDTO> skills = skillMapper.toDto(skillRepository.findAllByCurrentLogin());
        return skills;
    }

    /**
     * Finds all the skills by user id
     * @param id the user id
     * @return the list of skills
     */
    @Transactional(readOnly = true)
    public List<SkillDTO> findAllByUserId(Long id) {
        List<SkillDTO> skills = skillMapper.toDto(skillRepository.findAllByUserId(id));
        return skills;
    }


}
