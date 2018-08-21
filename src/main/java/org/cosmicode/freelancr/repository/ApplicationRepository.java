package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.Application;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Application entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    @Query("select application from Application application where application.user.login = ?#{principal.username}")
    List<Application> findByUserIsCurrentUser();

    @Query("select application from Application application join application.position position where position.project.id = :id and application.status = org.cosmicode.freelancr.domain.enumeration.ApplicationStatus.APPLIED")
    List<Application> findByProject(@Param("id") Long id);

    @Query("select application from Application application join application.messages msg where application.status = org.cosmicode.freelancr.domain.enumeration.ApplicationStatus.OFFERED and msg.receiver.id = :id")
    List<Application> findOfferedApplications(@Param("id") Long id);
}
