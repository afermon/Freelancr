package org.cosmicode.freelancr.repository.search;

import org.cosmicode.freelancr.domain.SkillType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SkillType entity.
 */
public interface SkillTypeSearchRepository extends ElasticsearchRepository<SkillType, Long> {
}
