package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.ApplicationMessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ApplicationMessage and its DTO ApplicationMessageDTO.
 */
@Mapper(componentModel = "spring", uses = {ApplicationMapper.class, UserMapper.class})
public interface ApplicationMessageMapper extends EntityMapper<ApplicationMessageDTO, ApplicationMessage> {

    @Mapping(source = "application.id", target = "applicationId")
    @Mapping(source = "sender.id", target = "senderId")
    @Mapping(source = "sender.login", target = "senderLogin")
    @Mapping(source = "receiver.id", target = "receiverId")
    @Mapping(source = "receiver.login", target = "receiverLogin")
    ApplicationMessageDTO toDto(ApplicationMessage applicationMessage);

    @Mapping(source = "applicationId", target = "application")
    @Mapping(source = "senderId", target = "sender")
    @Mapping(source = "receiverId", target = "receiver")
    ApplicationMessage toEntity(ApplicationMessageDTO applicationMessageDTO);

    default ApplicationMessage fromId(Long id) {
        if (id == null) {
            return null;
        }
        ApplicationMessage applicationMessage = new ApplicationMessage();
        applicationMessage.setId(id);
        return applicationMessage;
    }
}
