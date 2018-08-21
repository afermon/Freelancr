package org.cosmicode.freelancr.repository;

import org.cosmicode.freelancr.domain.SubscriptionTier;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the SubscriptionTier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionTierRepository extends JpaRepository<SubscriptionTier, Long> {
    @Query("select distinct subscription_tier from SubscriptionTier subscription_tier left join fetch subscription_tier.users")
    List<SubscriptionTier> findAllWithEagerRelationships();

    @Query("select subscription_tier from SubscriptionTier subscription_tier left join fetch subscription_tier.users where subscription_tier.id =:id")
    SubscriptionTier findOneWithEagerRelationships(@Param("id") Long id);

}
