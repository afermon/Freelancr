package org.cosmicode.freelancr.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.cosmicode.freelancr.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.UserFreelancr.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.UserFreelancr.class.getName() + ".skills", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Skill.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Skill.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.SkillType.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Language.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Language.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Project.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Project.class.getName() + ".positions", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Project.class.getName() + ".cards", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Project.class.getName() + ".feedbacks", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Project.class.getName() + ".comments", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Project.class.getName() + ".goals", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Project.class.getName() + ".followers", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Goal.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Feedback.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Card.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Position.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Position.class.getName() + ".applications", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Position.class.getName() + ".cards", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Position.class.getName() + ".skills", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.PositionType.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Application.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Application.class.getName() + ".messages", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.ApplicationMessage.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Comment.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Message.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Notification.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.SubscriptionTier.class.getName(), jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.SubscriptionTier.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(org.cosmicode.freelancr.domain.Position.class.getName() + ".hiredUsers", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
