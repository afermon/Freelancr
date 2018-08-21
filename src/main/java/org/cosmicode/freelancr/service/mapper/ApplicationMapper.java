package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.ApplicationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Application and its DTO ApplicationDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PositionMapper.class})
public interface ApplicationMapper extends EntityMapper<ApplicationDTO, Application> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "position.id", target = "positionId")
    @Mapping(source = "position.title", target = "positionTitle")
    ApplicationDTO toDto(Application application);

    @Mapping(target = "messages", ignore = true)
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "positionId", target = "position")
    Application toEntity(ApplicationDTO applicationDTO);

    default Application fromId(Long id) {
        if (id == null) {
            return null;
        }
        Application application = new Application();
        application.setId(id);
        return application;
    }
}
