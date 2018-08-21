package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.ProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Project and its DTO ProjectDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ProjectMapper extends EntityMapper<ProjectDTO, Project> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    ProjectDTO toDto(Project project);

    @Mapping(target = "positions", ignore = true)
    @Mapping(target = "cards", ignore = true)
    @Mapping(target = "feedbacks", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "goals", ignore = true)
    @Mapping(source = "userId", target = "user")
    Project toEntity(ProjectDTO projectDTO);

    default Project fromId(Long id) {
        if (id == null) {
            return null;
        }
        Project project = new Project();
        project.setId(id);
        return project;
    }
}
