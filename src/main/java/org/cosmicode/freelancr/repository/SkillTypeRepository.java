package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.SkillType;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;


/**
 * Spring Data JPA repository for the SkillType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SkillTypeRepository extends JpaRepository<SkillType, Long> {

    @Query("select distinct stype from SkillType stype where stype.name like concat('%',:name,'%')")
    List<SkillType> findBySTypeName(@Param("name") String name);
}
