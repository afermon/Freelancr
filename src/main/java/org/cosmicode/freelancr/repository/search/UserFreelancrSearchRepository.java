package org.cosmicode.freelancr.repository.search;

import org.cosmicode.freelancr.domain.UserFreelancr;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserFreelancr entity.
 */
public interface UserFreelancrSearchRepository extends ElasticsearchRepository<UserFreelancr, Long> {
}
