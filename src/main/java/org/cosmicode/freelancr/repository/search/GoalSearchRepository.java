package org.cosmicode.freelancr.repository.search;

import org.cosmicode.freelancr.domain.Goal;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Goal entity.
 */
public interface GoalSearchRepository extends ElasticsearchRepository<Goal, Long> {
}
