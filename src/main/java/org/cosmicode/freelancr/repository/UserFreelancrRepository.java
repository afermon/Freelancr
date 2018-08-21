package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.UserFreelancr;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;


/**
 * Spring Data JPA repository for the UserFreelancr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserFreelancrRepository extends JpaRepository<UserFreelancr, Long> {

    @Query("select userfreelancr from UserFreelancr userfreelancr where userfreelancr.user.login = ?#{principal.username}")
    UserFreelancr findByUserIsCurrentUser();

    @Query("select distinct userfreelancr from UserFreelancr userfreelancr left join fetch userfreelancr.skills")
    List<UserFreelancr> findAllWithEagerRelationships();

    @Query("select userfreelancr from UserFreelancr userfreelancr left join fetch userfreelancr.skills where userfreelancr.id =:id")
    UserFreelancr findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select userfreelancr from UserFreelancr userfreelancr where userfreelancr.user.id =:id")
    List<UserFreelancr> finByJhiUserId(@Param("id") Long id);
}
