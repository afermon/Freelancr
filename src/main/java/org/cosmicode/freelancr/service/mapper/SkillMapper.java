package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.SkillDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Skill and its DTO SkillDTO.
 */
@Mapper(componentModel = "spring", uses = {SkillTypeMapper.class, UserMapper.class})
public interface SkillMapper extends EntityMapper<SkillDTO, Skill> {

    @Mapping(source = "type.id", target = "typeId")
    @Mapping(source = "type.name", target = "typeName")
    SkillDTO toDto(Skill skill);

    @Mapping(source = "typeId", target = "type")
    Skill toEntity(SkillDTO skillDTO);

    default Skill fromId(Long id) {
        if (id == null) {
            return null;
        }
        Skill skill = new Skill();
        skill.setId(id);
        return skill;
    }
}
