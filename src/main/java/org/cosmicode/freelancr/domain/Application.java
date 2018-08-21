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

import org.cosmicode.freelancr.domain.enumeration.ApplicationStatus;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "application")
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApplicationStatus status;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "bid", nullable = false)
    private Double bid;

    @OneToMany(mappedBy = "application")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ApplicationMessage> messages = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToOne
    private Position position;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public Application status(ApplicationStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public Double getBid() {
        return bid;
    }

    public Application bid(Double bid) {
        this.bid = bid;
        return this;
    }

    public void setBid(Double bid) {
        this.bid = bid;
    }

    public Set<ApplicationMessage> getMessages() {
        return messages;
    }

    public Application messages(Set<ApplicationMessage> applicationMessages) {
        this.messages = applicationMessages;
        return this;
    }

    public Application addMessages(ApplicationMessage applicationMessage) {
        this.messages.add(applicationMessage);
        applicationMessage.setApplication(this);
        return this;
    }

    public Application removeMessages(ApplicationMessage applicationMessage) {
        this.messages.remove(applicationMessage);
        applicationMessage.setApplication(null);
        return this;
    }

    public void setMessages(Set<ApplicationMessage> applicationMessages) {
        this.messages = applicationMessages;
    }

    public User getUser() {
        return user;
    }

    public Application user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Position getPosition() {
        return position;
    }

    public Application position(Position position) {
        this.position = position;
        return this;
    }

    public void setPosition(Position position) {
        this.position = position;
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
        Application application = (Application) o;
        if (application.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), application.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", bid=" + getBid() +
            "}";
    }
}
