package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.SubscriptionTierDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubscriptionTier and its DTO SubscriptionTierDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface SubscriptionTierMapper extends EntityMapper<SubscriptionTierDTO, SubscriptionTier> {



    default SubscriptionTier fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubscriptionTier subscriptionTier = new SubscriptionTier();
        subscriptionTier.setId(id);
        return subscriptionTier;
    }
}
