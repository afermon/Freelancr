package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.ApplicationMessage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ApplicationMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationMessageRepository extends JpaRepository<ApplicationMessage, Long> {

    List<ApplicationMessage> findAllByApplicationId(Long id);
    @Query("select application_message from ApplicationMessage application_message where application_message.sender.login = ?#{principal.username}")
    List<ApplicationMessage> findBySenderIsCurrentUser();

    @Query("select application_message from ApplicationMessage application_message where application_message.receiver.login = ?#{principal.username}")
    List<ApplicationMessage> findByReceiverIsCurrentUser();

}
