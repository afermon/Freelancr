import { BaseEntity, User } from './../../shared';
import {PositionFreelancr} from '../position-freelancr';
import {SkillTypeFreelancr} from '../skill-type-freelancr';

export const enum ProjectStatus {
    'PUBLISHED',
    'IN_PROGRESS',
    'FINISHED'
}

export class ProjectFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public status?: ProjectStatus,
        public deadline?: any,
        public startDate?: any,
        public endDate?: any,
        public gitRepo?: string,
        public slackChannel?: string,
        public positions?: PositionFreelancr[],
        public positionCount?: number,
        public cards?: BaseEntity[],
        public feedbacks?: BaseEntity[],
        public comments?: BaseEntity[],
        public goals?: BaseEntity[],
        public userLogin?: string,
        public userId?: number,
        public followers?: User[],
        public skills?: SkillTypeFreelancr[]
    ) {
    }
}
