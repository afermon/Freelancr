package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.GoalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Goal and its DTO GoalDTO.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface GoalMapper extends EntityMapper<GoalDTO, Goal> {

    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.title", target = "projectTitle")
    GoalDTO toDto(Goal goal);

    @Mapping(source = "projectId", target = "project")
    Goal toEntity(GoalDTO goalDTO);

    default Goal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Goal goal = new Goal();
        goal.setId(id);
        return goal;
    }
}
