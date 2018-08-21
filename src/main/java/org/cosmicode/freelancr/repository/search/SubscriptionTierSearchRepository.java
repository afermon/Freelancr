package org.cosmicode.freelancr.repository.search;

import org.cosmicode.freelancr.domain.SubscriptionTier;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SubscriptionTier entity.
 */
public interface SubscriptionTierSearchRepository extends ElasticsearchRepository<SubscriptionTier, Long> {
}
