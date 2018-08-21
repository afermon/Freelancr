package org.cosmicode.freelancr.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import org.cosmicode.freelancr.domain.enumeration.UserStatus;

/**
 * A DTO for the UserFreelancr entity.
 */
public class UserFreelancrDTO implements Serializable {

    private Long id;

    @Size(min = 4, max = 500)
    private String description;

    @Size(min = 4, max = 25)
    @Pattern(regexp = "^(1[ \\-\\+]{0,3}|\\+1[ -\\+]{0,3}|\\+1|\\+)?((\\(\\+?1-[2-9][0-9]{1,2}\\))|(\\(\\+?[2-8][0-9][0-9]\\))|(\\(\\+?[1-9][0-9]\\))|(\\(\\+?[17]\\))|(\\([2-9][2-9]\\))|([ \\-\\.]{0,3}[0-9]{2,4}))?([ \\-\\.][0-9])?([ \\-\\.]{0,3}[0-9]{2,4}){2,3}$")
    private String phone;

    @Size(min = 4, max = 150)
    private String address;

    private LocalDate birthDate;

    @Min(value = 0)
    @Max(value = 168)
    private Integer weeklyAvailability;

    @Min(value = 0)
    private Integer ranking;

    private UserStatus status;

    @Size(min = 4, max = 50)
    @Pattern(regexp = "^\\S*$")
    private String linkedInUser;

    @Size(max = 50)
    @Pattern(regexp = "^\\S*$")
    private String gitUser;

    @Size(min = 4, max = 150)
    @Pattern(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}")
    private String paypalAccount;

    @Size(min = 4, max = 1000)
    private String personalLink;

    @Size(min = 4, max = 1000)
    private String resumeLink;

    private Long userId;

    private String userLogin;

    private UserDTO user;

    private Set<SkillDTO> skills = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getWeeklyAvailability() {
        return weeklyAvailability;
    }

    public void setWeeklyAvailability(Integer weeklyAvailability) {
        this.weeklyAvailability = weeklyAvailability;
    }

    public Integer getRanking() {
        return ranking;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public String getLinkedInUser() {
        return linkedInUser;
    }

    public void setLinkedInUser(String linkedInUser) {
        this.linkedInUser = linkedInUser;
    }

    public String getGitUser() {
        return gitUser;
    }

    public void setGitUser(String gitUser) {
        this.gitUser = gitUser;
    }

    public String getPaypalAccount() {
        return paypalAccount;
    }

    public void setPaypalAccount(String paypalAccount) {
        this.paypalAccount = paypalAccount;
    }

    public String getPersonalLink() {
        return personalLink;
    }

    public void setPersonalLink(String personalLink) {
        this.personalLink = personalLink;
    }

    public String getResumeLink() {
        return resumeLink;
    }

    public void setResumeLink(String resumeLink) {
        this.resumeLink = resumeLink;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public UserDTO getUser() {
        return user;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Set<SkillDTO> getSkills() {
        return skills;
    }

    public void setSkills(Set<SkillDTO> skills) {
        this.skills = skills;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserFreelancrDTO userFreelancrDTO = (UserFreelancrDTO) o;
        if(userFreelancrDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userFreelancrDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserFreelancrDTO{" +
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
