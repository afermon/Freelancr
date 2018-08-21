package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.PositionTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PositionType and its DTO PositionTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PositionTypeMapper extends EntityMapper<PositionTypeDTO, PositionType> {



    default PositionType fromId(Long id) {
        if (id == null) {
            return null;
        }
        PositionType positionType = new PositionType();
        positionType.setId(id);
        return positionType;
    }
}
