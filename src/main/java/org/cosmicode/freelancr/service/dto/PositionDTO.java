package org.cosmicode.freelancr.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Position entity.
 */
public class PositionDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 4, max = 100)
    private String title;

    @NotNull
    @Size(min = 4, max = 500)
    private String description;

    @Min(value = 1)
    private Integer quantity;

    private Long typeId;

    private String typeName;

    private Set<SkillTypeDTO> skills = new HashSet<>();

    private Set<UserDTO> hiredUsers = new HashSet<>();

    private Long projectId;

    private String projectTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long positionTypeId) {
        this.typeId = positionTypeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String positionTypeName) {
        this.typeName = positionTypeName;
    }

    public Set<SkillTypeDTO> getSkills() {
        return skills;
    }

    public void setSkills(Set<SkillTypeDTO> skillTypes) {
        this.skills = skillTypes;
    }

    public Set<UserDTO> getHiredUsers() {
        return hiredUsers;
    }

    public void setHiredUsers(Set<UserDTO> users) {
        this.hiredUsers = users;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PositionDTO positionDTO = (PositionDTO) o;
        if(positionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), positionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PositionDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
