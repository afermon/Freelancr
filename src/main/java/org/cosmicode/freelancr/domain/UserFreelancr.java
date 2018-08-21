package org.cosmicode.freelancr.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import org.cosmicode.freelancr.domain.enumeration.UserStatus;

/**
 * A UserFreelancr.
 */
@Entity
@Table(name = "user_freelancr")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "userfreelancr")
public class UserFreelancr implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 4, max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @Size(min = 4, max = 25)
    @Pattern(regexp = "^(1[ \\-\\+]{0,3}|\\+1[ -\\+]{0,3}|\\+1|\\+)?((\\(\\+?1-[2-9][0-9]{1,2}\\))|(\\(\\+?[2-8][0-9][0-9]\\))|(\\(\\+?[1-9][0-9]\\))|(\\(\\+?[17]\\))|(\\([2-9][2-9]\\))|([ \\-\\.]{0,3}[0-9]{2,4}))?([ \\-\\.][0-9])?([ \\-\\.]{0,3}[0-9]{2,4}){2,3}$")
    @Column(name = "phone", length = 25)
    private String phone;

    @Size(min = 4, max = 150)
    @Column(name = "address", length = 150)
    private String address;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Min(value = 0)
    @Max(value = 168)
    @Column(name = "weekly_availability")
    private Integer weeklyAvailability;

    @Min(value = 0)
    @Column(name = "ranking")
    private Integer ranking;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus status;

    @Size(min = 4, max = 50)
    @Pattern(regexp = "^\\S*$")
    @Column(name = "linked_in_user", length = 50)
    private String linkedInUser;

    @Size(max = 50)
    @Pattern(regexp = "^\\S*$")
    @Column(name = "git_user", length = 50)
    private String gitUser;

    @Size(min = 4, max = 150)
    @Pattern(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}")
    @Column(name = "paypal_account", length = 150)
    private String paypalAccount;

    @Size(min = 4, max = 1000)
    @Column(name = "personal_link", length = 1000)
    private String personalLink;

    @Size(min = 4, max = 1000)
    @Column(name = "resume_link", length = 1000)
    private String resumeLink;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "skill_user",
        joinColumns = @JoinColumn(name="users_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="skills_id", referencedColumnName="id"))
    private Set<Skill> skills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public UserFreelancr description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public UserFreelancr phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public UserFreelancr address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public UserFreelancr birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getWeeklyAvailability() {
        return weeklyAvailability;
    }

    public UserFreelancr weeklyAvailability(Integer weeklyAvailability) {
        this.weeklyAvailability = weeklyAvailability;
        return this;
    }

    public void setWeeklyAvailability(Integer weeklyAvailability) {
        this.weeklyAvailability = weeklyAvailability;
    }

    public Integer getRanking() {
        return ranking;
    }

    public UserFreelancr ranking(Integer ranking) {
        this.ranking = ranking;
        return this;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public UserStatus getStatus() {
        return status;
    }

    public UserFreelancr status(UserStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public String getLinkedInUser() {
        return linkedInUser;
    }

    public UserFreelancr linkedInUser(String linkedInUser) {
        this.linkedInUser = linkedInUser;
        return this;
    }

    public void setLinkedInUser(String linkedInUser) {
        this.linkedInUser = linkedInUser;
    }

    public String getGitUser() {
        return gitUser;
    }

    public UserFreelancr gitUser(String gitUser) {
        this.gitUser = gitUser;
        return this;
    }

    public void setGitUser(String gitUser) {
        this.gitUser = gitUser;
    }

    public String getPaypalAccount() {
        return paypalAccount;
    }

    public UserFreelancr paypalAccount(String paypalAccount) {
        this.paypalAccount = paypalAccount;
        return this;
    }

    public void setPaypalAccount(String paypalAccount) {
        this.paypalAccount = paypalAccount;
    }

    public String getPersonalLink() {
        return personalLink;
    }

    public UserFreelancr personalLink(String personalLink) {
        this.personalLink = personalLink;
        return this;
    }

    public void setPersonalLink(String personalLink) {
        this.personalLink = personalLink;
    }

    public String getResumeLink() {
        return resumeLink;
    }

    public UserFreelancr resumeLink(String resumeLink) {
        this.resumeLink = resumeLink;
        return this;
    }

    public void setResumeLink(String resumeLink) {
        this.resumeLink = resumeLink;
    }

    public User getUser() {
        return user;
    }

    public UserFreelancr user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
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
        UserFreelancr userFreelancr = (UserFreelancr) o;
        if (userFreelancr.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userFreelancr.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserFreelancr{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", phone='" + getPhone() + "'" +
            ", address='" + getAddress() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", weeklyAvailability=" + getWeeklyAvailability() +
            ", ranking=" + getRanking() +
            ", status='" + getStatus() + "'" +
            ", linkedInUser='" + getLinkedInUser() + "'" +
            ", gitUser='" + getGitUser() + "'" +
            ", paypalAccount='" + getPaypalAccount() + "'" +
            ", personalLink='" + getPersonalLink() + "'" +
            ", resumeLink='" + getResumeLink() + "'" +
            "}";
    }
}
