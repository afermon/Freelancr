package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.Project;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select project from Project project where project.user.login = ?#{principal.username}")
    List<Project> findByUserIsCurrentUser();

    @Query("select distinct project from Project project left join fetch project.followers")
    List<Project> findAllWithEagerRelationships();

    @Query("select project from Project project left join fetch project.followers where project.id =:id")
    Project findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select project from Project project where project.user.login = ?#{principal.username} and project.status = org.cosmicode.freelancr.domain.enumeration.ProjectStatus.PUBLISHED or project.status = org.cosmicode.freelancr.domain.enumeration.ProjectStatus.IN_PROGRESS")
    List<Project> findByProjectNotFinished();

    @Query("select distinct project from Project project " +
        "inner join project.positions positions " +
        "inner join positions.hiredUsers hiredUsers " +
        "where hiredUsers.login = ?#{principal.username}")
    List<Project> findByMember();
}
