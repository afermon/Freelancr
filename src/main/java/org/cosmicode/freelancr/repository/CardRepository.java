package org.cosmicode.freelancr.repository;
import org.cosmicode.freelancr.domain.Card;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;
/**
 * Spring Data JPA repository for the Card entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByProjectId(Long id);

    @Query("select card from Card card where card.user.login = ?#{principal.username}")
    List<Card> findByUserIsCurrentUser();

    @Query("select count(card.id) from Card card where card.user.login = ?#{principal.username} and card.status <> org.cosmicode.freelancr.domain.enumeration.CardStatus.CLOSED")
    Long countAssignedCards();
}
