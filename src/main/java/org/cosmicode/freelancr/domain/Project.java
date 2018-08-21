package org.cosmicode.freelancr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.cosmicode.freelancr.domain.enumeration.ProjectStatus;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 100)
    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @NotNull
    @Size(min = 4, max = 2000)
    @Column(name = "description", length = 2000, nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ProjectStatus status;

    @NotNull
    @Column(name = "deadline", nullable = false)
    private LocalDate deadline;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Size(min = 1, max = 100)
    @Column(name = "git_repo", length = 100)
    private String gitRepo;

    @Size(min = 1, max = 100)
    @Column(name = "slack_channel", length = 100)
    private String slackChannel;

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Position> positions = new HashSet<>();

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Card> cards = new HashSet<>();

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Feedback> feedbacks = new HashSet<>();

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Goal> goals = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "project_followers",
               joinColumns = @JoinColumn(name="projects_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="followers_id", referencedColumnName="id"))
    private Set<User> followers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Project title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Project description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public Project status(ProjectStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public Project deadline(LocalDate deadline) {
        this.deadline = deadline;
        return this;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Project startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Project endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getGitRepo() {
        return gitRepo;
    }

    public Project gitRepo(String gitRepo) {
        this.gitRepo = gitRepo;
        return this;
    }

    public void setGitRepo(String gitRepo) {
        this.gitRepo = gitRepo;
    }

    public String getSlackChannel() {
        return slackChannel;
    }

    public Project slackChannel(String slackChannel) {
        this.slackChannel = slackChannel;
        return this;
    }

    public void setSlackChannel(String slackChannel) {
        this.slackChannel = slackChannel;
    }

    public Set<Position> getPositions() {
        return positions;
    }

    public Project positions(Set<Position> positions) {
        this.positions = positions;
        return this;
    }

    public Project addPosition(Position position) {
        this.positions.add(position);
        position.setProject(this);
        return this;
    }

    public Project removePosition(Position position) {
        this.positions.remove(position);
        position.setProject(null);
        return this;
    }

    public void setPositions(Set<Position> positions) {
        this.positions = positions;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public Project cards(Set<Card> cards) {
        this.cards = cards;
        return this;
    }

    public Project addCard(Card card) {
        this.cards.add(card);
        card.setProject(this);
        return this;
    }

    public Project removeCard(Card card) {
        this.cards.remove(card);
        card.setProject(null);
        return this;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public Set<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public Project feedbacks(Set<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
        return this;
    }

    public Project addFeedback(Feedback feedback) {
        this.feedbacks.add(feedback);
        feedback.setProject(this);
        return this;
    }

    public Project removeFeedback(Feedback feedback) {
        this.feedbacks.remove(feedback);
        feedback.setProject(null);
        return this;
    }

    public void setFeedbacks(Set<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Project comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Project addComment(Comment comment) {
        this.comments.add(comment);
        comment.setProject(this);
        return this;
    }

    public Project removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setProject(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Goal> getGoals() {
        return goals;
    }

    public Project goals(Set<Goal> goals) {
        this.goals = goals;
        return this;
    }

    public Project addGoal(Goal goal) {
        this.goals.add(goal);
        goal.setProject(this);
        return this;
    }

    public Project removeGoal(Goal goal) {
        this.goals.remove(goal);
        goal.setProject(null);
        return this;
    }

    public void setGoals(Set<Goal> goals) {
        this.goals = goals;
    }

    public User getUser() {
        return user;
    }

    public Project user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public Project followers(Set<User> users) {
        this.followers = users;
        return this;
    }

    public Project addFollowers(User user) {
        this.followers.add(user);
        return this;
    }

    public Project removeFollowers(User user) {
        this.followers.remove(user);
        return this;
    }

    public void setFollowers(Set<User> users) {
        this.followers = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Project project = (Project) o;
        if (project.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), project.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", deadline='" + getDeadline() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", gitRepo='" + getGitRepo() + "'" +
            ", slackChannel='" + getSlackChannel() + "'" +
            "}";
    }
}
