package org.cosmicode.freelancr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Position.
 */
@Entity
@Table(name = "position")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "position")
public class Position implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 100)
    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @NotNull
    @Size(min = 4, max = 500)
    @Column(name = "description", length = 500, nullable = false)
    private String description;

    @Min(value = 1)
    @Column(name = "quantity")
    private Integer quantity;

    @OneToMany(mappedBy = "position")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Application> applications = new HashSet<>();

    @OneToMany(mappedBy = "position")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Card> cards = new HashSet<>();

    @ManyToOne
    private PositionType type;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "position_skill",
               joinColumns = @JoinColumn(name="positions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="skills_id", referencedColumnName="id"))
    private Set<SkillType> skills = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "position_hired_users",
               joinColumns = @JoinColumn(name="positions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="hired_users_id", referencedColumnName="id"))
    private Set<User> hiredUsers = new HashSet<>();

    @ManyToOne
    private Project project;

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

    public Position title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Position description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Position quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public Position applications(Set<Application> applications) {
        this.applications = applications;
        return this;
    }

    public Position addApplication(Application application) {
        this.applications.add(application);
        application.setPosition(this);
        return this;
    }

    public Position removeApplication(Application application) {
        this.applications.remove(application);
        application.setPosition(null);
        return this;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public Position cards(Set<Card> cards) {
        this.cards = cards;
        return this;
    }

    public Position addCard(Card card) {
        this.cards.add(card);
        card.setPosition(this);
        return this;
    }

    public Position removeCard(Card card) {
        this.cards.remove(card);
        card.setPosition(null);
        return this;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public PositionType getType() {
        return type;
    }

    public Position type(PositionType positionType) {
        this.type = positionType;
        return this;
    }

    public void setType(PositionType positionType) {
        this.type = positionType;
    }

    public Set<SkillType> getSkills() {
        return skills;
    }

    public Position skills(Set<SkillType> skillTypes) {
        this.skills = skillTypes;
        return this;
    }

    public Position addSkill(SkillType skillType) {
        this.skills.add(skillType);
        return this;
    }

    public Position removeSkill(SkillType skillType) {
        this.skills.remove(skillType);
        return this;
    }

    public void setSkills(Set<SkillType> skillTypes) {
        this.skills = skillTypes;
    }

    public Set<User> getHiredUsers() {
        return hiredUsers;
    }

    public Position hiredUsers(Set<User> users) {
        this.hiredUsers = users;
        return this;
    }

    public Position addHiredUsers(User user) {
        this.hiredUsers.add(user);
        return this;
    }

    public Position removeHiredUsers(User user) {
        this.hiredUsers.remove(user);
        return this;
    }

    public void setHiredUsers(Set<User> users) {
        this.hiredUsers = users;
    }

    public Project getProject() {
        return project;
    }

    public Position project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
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
        Position position = (Position) o;
        if (position.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), position.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Position{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
