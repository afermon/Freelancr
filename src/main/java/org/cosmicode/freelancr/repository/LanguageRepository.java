package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.Language;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Language entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    @Query("select distinct language from Language language left join fetch language.users")
    List<Language> findAllWithEagerRelationships();

    @Query("select language from Language language left join fetch language.users where language.id =:id")
    Language findOneWithEagerRelationships(@Param("id") Long id);

}
