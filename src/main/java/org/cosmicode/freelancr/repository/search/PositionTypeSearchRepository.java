package org.cosmicode.freelancr.repository.search;

import org.cosmicode.freelancr.domain.PositionType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PositionType entity.
 */
public interface PositionTypeSearchRepository extends ElasticsearchRepository<PositionType, Long> {
}
