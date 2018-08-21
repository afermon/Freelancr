package org.cosmicode.freelancr.repository.search;

import org.cosmicode.freelancr.domain.ApplicationMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ApplicationMessage entity.
 */
public interface ApplicationMessageSearchRepository extends ElasticsearchRepository<ApplicationMessage, Long> {
}
