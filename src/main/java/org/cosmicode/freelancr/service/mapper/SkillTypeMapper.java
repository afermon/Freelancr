package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.SkillTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SkillType and its DTO SkillTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SkillTypeMapper extends EntityMapper<SkillTypeDTO, SkillType> {



    default SkillType fromId(Long id) {
        if (id == null) {
            return null;
        }
        SkillType skillType = new SkillType();
        skillType.setId(id);
        return skillType;
    }
}
