package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.Skill;
import org.cosmicode.freelancr.domain.UserFreelancr;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Skill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    @Query("select distinct skill from Skill skill left join fetch skill.users")
    List<Skill> findAllWithEagerRelationships();

    @Query("select skill from Skill skill left join fetch skill.users where skill.id =:id")
    Skill findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct skill from Skill skill join skill.users user where user.login = ?#{principal.username}")
    List<Skill> findAllByCurrentLogin();

    @Query("select skill from Skill skill join skill.users user where user.id = :id")
    List<Skill> findAllByUserId(@Param("id") Long id);


}
