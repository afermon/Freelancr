package org.cosmicode.freelancr.repository;
import org.cosmicode.freelancr.domain.Message;
import org.cosmicode.freelancr.domain.User;
import org.cosmicode.freelancr.service.dto.UserDTO;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("select message from Message message where message.sender.login = ?#{principal.username}  order by message.timestamp desc")
    List<Message> findBySenderIsCurrentUser();

    @Query("select message from Message message where message.receiver.login = ?#{principal.username} order by message.timestamp desc")
    List<Message> findByReceiverIsCurrentUser();

    @Query("select count(message.id) from Message message where message.receiver.login = ?#{principal.username} and message.status = org.cosmicode.freelancr.domain.enumeration.MessageStatus.NEW")
    Long findUnreadMessages();
}
