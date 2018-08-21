package org.cosmicode.freelancr.service;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.repository.*;
import org.cosmicode.freelancr.repository.search.*;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ManyToMany;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

    private static final Lock reindexLock = new ReentrantLock();

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final ApplicationRepository applicationRepository;

    private final ApplicationSearchRepository applicationSearchRepository;

    private final ApplicationMessageRepository applicationMessageRepository;

    private final ApplicationMessageSearchRepository applicationMessageSearchRepository;

    private final CardRepository cardRepository;

    private final CardSearchRepository cardSearchRepository;

    private final CommentRepository commentRepository;

    private final CommentSearchRepository commentSearchRepository;

    private final FeedbackRepository feedbackRepository;

    private final FeedbackSearchRepository feedbackSearchRepository;

    private final GoalRepository goalRepository;

    private final GoalSearchRepository goalSearchRepository;

    private final LanguageRepository languageRepository;

    private final LanguageSearchRepository languageSearchRepository;

    private final MessageRepository messageRepository;

    private final MessageSearchRepository messageSearchRepository;

    private final NotificationRepository notificationRepository;

    private final NotificationSearchRepository notificationSearchRepository;

    private final PositionRepository positionRepository;

    private final PositionSearchRepository positionSearchRepository;

    private final PositionTypeRepository positionTypeRepository;

    private final PositionTypeSearchRepository positionTypeSearchRepository;

    private final ProjectRepository projectRepository;

    private final ProjectSearchRepository projectSearchRepository;

    private final SkillRepository skillRepository;

    private final SkillSearchRepository skillSearchRepository;

    private final SkillTypeRepository skillTypeRepository;

    private final SkillTypeSearchRepository skillTypeSearchRepository;

    private final SubscriptionTierRepository subscriptionTierRepository;

    private final SubscriptionTierSearchRepository subscriptionTierSearchRepository;

    private final UserFreelancrRepository userFreelancrRepository;

    private final UserFreelancrSearchRepository userFreelancrSearchRepository;

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        ApplicationRepository applicationRepository,
        ApplicationSearchRepository applicationSearchRepository,
        ApplicationMessageRepository applicationMessageRepository,
        ApplicationMessageSearchRepository applicationMessageSearchRepository,
        CardRepository cardRepository,
        CardSearchRepository cardSearchRepository,
        CommentRepository commentRepository,
        CommentSearchRepository commentSearchRepository,
        FeedbackRepository feedbackRepository,
        FeedbackSearchRepository feedbackSearchRepository,
        GoalRepository goalRepository,
        GoalSearchRepository goalSearchRepository,
        LanguageRepository languageRepository,
        LanguageSearchRepository languageSearchRepository,
        MessageRepository messageRepository,
        MessageSearchRepository messageSearchRepository,
        NotificationRepository notificationRepository,
        NotificationSearchRepository notificationSearchRepository,
        PositionRepository positionRepository,
        PositionSearchRepository positionSearchRepository,
        PositionTypeRepository positionTypeRepository,
        PositionTypeSearchRepository positionTypeSearchRepository,
        ProjectRepository projectRepository,
        ProjectSearchRepository projectSearchRepository,
        SkillRepository skillRepository,
        SkillSearchRepository skillSearchRepository,
        SkillTypeRepository skillTypeRepository,
        SkillTypeSearchRepository skillTypeSearchRepository,
        SubscriptionTierRepository subscriptionTierRepository,
        SubscriptionTierSearchRepository subscriptionTierSearchRepository,
        UserFreelancrRepository userFreelancrRepository,
        UserFreelancrSearchRepository userFreelancrSearchRepository,
        ElasticsearchTemplate elasticsearchTemplate) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.applicationRepository = applicationRepository;
        this.applicationSearchRepository = applicationSearchRepository;
        this.applicationMessageRepository = applicationMessageRepository;
        this.applicationMessageSearchRepository = applicationMessageSearchRepository;
        this.cardRepository = cardRepository;
        this.cardSearchRepository = cardSearchRepository;
        this.commentRepository = commentRepository;
        this.commentSearchRepository = commentSearchRepository;
        this.feedbackRepository = feedbackRepository;
        this.feedbackSearchRepository = feedbackSearchRepository;
        this.goalRepository = goalRepository;
        this.goalSearchRepository = goalSearchRepository;
        this.languageRepository = languageRepository;
        this.languageSearchRepository = languageSearchRepository;
        this.messageRepository = messageRepository;
        this.messageSearchRepository = messageSearchRepository;
        this.notificationRepository = notificationRepository;
        this.notificationSearchRepository = notificationSearchRepository;
        this.positionRepository = positionRepository;
        this.positionSearchRepository = positionSearchRepository;
        this.positionTypeRepository = positionTypeRepository;
        this.positionTypeSearchRepository = positionTypeSearchRepository;
        this.projectRepository = projectRepository;
        this.projectSearchRepository = projectSearchRepository;
        this.skillRepository = skillRepository;
        this.skillSearchRepository = skillSearchRepository;
        this.skillTypeRepository = skillTypeRepository;
        this.skillTypeSearchRepository = skillTypeSearchRepository;
        this.subscriptionTierRepository = subscriptionTierRepository;
        this.subscriptionTierSearchRepository = subscriptionTierSearchRepository;
        this.userFreelancrRepository = userFreelancrRepository;
        this.userFreelancrSearchRepository = userFreelancrSearchRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Async
    @Timed
    public void reindexAll() {
        if (reindexLock.tryLock()) {
            try {
                reindexForClass(Application.class, applicationRepository, applicationSearchRepository);
                reindexForClass(ApplicationMessage.class, applicationMessageRepository, applicationMessageSearchRepository);
                reindexForClass(Card.class, cardRepository, cardSearchRepository);
                reindexForClass(Comment.class, commentRepository, commentSearchRepository);
                reindexForClass(Feedback.class, feedbackRepository, feedbackSearchRepository);
                reindexForClass(Goal.class, goalRepository, goalSearchRepository);
                reindexForClass(Language.class, languageRepository, languageSearchRepository);
                reindexForClass(Message.class, messageRepository, messageSearchRepository);
                reindexForClass(Notification.class, notificationRepository, notificationSearchRepository);
                reindexForClass(Position.class, positionRepository, positionSearchRepository);
                reindexForClass(PositionType.class, positionTypeRepository, positionTypeSearchRepository);
                reindexForClass(Project.class, projectRepository, projectSearchRepository);
                reindexForClass(Skill.class, skillRepository, skillSearchRepository);
                reindexForClass(SkillType.class, skillTypeRepository, skillTypeSearchRepository);
                reindexForClass(SubscriptionTier.class, subscriptionTierRepository, subscriptionTierSearchRepository);
                reindexForClass(UserFreelancr.class, userFreelancrRepository, userFreelancrSearchRepository);
                reindexForClass(User.class, userRepository, userSearchRepository);

                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }

    @SuppressWarnings("unchecked")
    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (IndexAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
            List<Method> relationshipGetters = Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> field.getType().equals(Set.class))
                .filter(field -> field.getAnnotation(ManyToMany.class) != null)
                .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                .map(field -> {
                    try {
                        return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
                    } catch (IntrospectionException e) {
                        log.error("Error retrieving getter for class {}, field {}. Field will NOT be indexed",
                            entityClass.getSimpleName(), field.getName(), e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            int size = 100;
            for (int i = 0; i < jpaRepository.count() / size; i++) {
                Pageable page = new PageRequest(i, size);
                log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
                Page<T> results = jpaRepository.findAll(page);
                results.map(result -> {
                    // if there are any relationships to load, do it now
                    relationshipGetters.forEach(method -> {
                        try {
                            // eagerly load the relationship set
                            ((Set) method.invoke(result)).size();
                        } catch (Exception ex) {
                            log.error(ex.getMessage());
                        }
                    });
                    return result;
                });
                elasticsearchRepository.save(results.getContent());
            }
        }
        log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
    }
}
