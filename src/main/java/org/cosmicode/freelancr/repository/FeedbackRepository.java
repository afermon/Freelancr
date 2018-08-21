package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.Feedback;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Feedback entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query("select feedback from Feedback feedback where feedback.user.login = ?#{principal.username}")
    List<Feedback> findByUserIsCurrentUser();

    @Query("select feedback from Feedback feedback where feedback.user.id = :id order by feedback.timeStamp desc")
    List<Feedback> findByUserId(@Param("id") Long id);

    @Query("select avg(feedback.rating) from Feedback feedback join feedback.user where feedback.user.id = :id")
    double getAvgRating(@Param("id") Long id);

    @Query("select feedback from Feedback feedback where feedback.user.id = :uid and feedback.project.id = :pid")
    List<Feedback> checkIfFeedbackExists(@Param("uid") Long uid, @Param("pid") Long pid);

}
