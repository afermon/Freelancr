package org.cosmicode.freelancr.service.mapper;

import org.cosmicode.freelancr.domain.*;
import org.cosmicode.freelancr.service.dto.UserFreelancrDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserFreelancr and its DTO UserFreelancrDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, SkillMapper.class})
public interface UserFreelancrMapper extends EntityMapper<UserFreelancrDTO, UserFreelancr> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    UserFreelancrDTO toDto(UserFreelancr userFreelancr);

    @Mapping(source = "userId", target = "user")
    UserFreelancr toEntity(UserFreelancrDTO userFreelancrDTO);

    default UserFreelancr fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserFreelancr userFreelancr = new UserFreelancr();
        userFreelancr.setId(id);
        return userFreelancr;
    }
}
