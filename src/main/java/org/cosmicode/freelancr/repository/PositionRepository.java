package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.Position;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Position entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
    @Query("select distinct position from Position position left join fetch position.skills left join fetch position.hiredUsers")
    List<Position> findAllWithEagerRelationships();

    @Query("select position from Position position left join fetch position.skills left join fetch position.hiredUsers where position.id =:id")
    Position findOneWithEagerRelationships(@Param("id") Long id);

    List<Position> findByProjectId(Long id);
}
