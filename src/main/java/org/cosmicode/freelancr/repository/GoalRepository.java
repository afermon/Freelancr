package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.Goal;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Goal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByProjectId(long id);
}
