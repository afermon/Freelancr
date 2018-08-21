package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.MessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Message and its DTO MessageDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {

    @Mapping(source = "reply.id", target = "replyId")
    @Mapping(source = "sender.id", target = "senderId")
    @Mapping(source = "sender.login", target = "senderLogin")
    @Mapping(source = "receiver.id", target = "receiverId")
    @Mapping(source = "receiver.login", target = "receiverLogin")
    MessageDTO toDto(Message message);

    @Mapping(source = "replyId", target = "reply")
    @Mapping(source = "senderId", target = "sender")
    @Mapping(source = "receiverId", target = "receiver")
    Message toEntity(MessageDTO messageDTO);

    default Message fromId(Long id) {
        if (id == null) {
            return null;
        }
        Message message = new Message();
        message.setId(id);
        return message;
    }
}
