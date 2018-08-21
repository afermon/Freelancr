package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.PositionType;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the PositionType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PositionTypeRepository extends JpaRepository<PositionType, Long> {

    @Query("select distinct ptype from PositionType ptype where ptype.name like concat('%',:name,'%')")
    List<PositionType> findByPTypeName(@Param("name") String name);
}
