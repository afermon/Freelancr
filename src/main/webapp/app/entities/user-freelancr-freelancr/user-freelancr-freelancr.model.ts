import { BaseEntity } from './../../shared';
import {User} from '../../shared';
import {SkillFreelancr} from '../skill-freelancr';

export const enum UserStatus {
    'ACTIVE',
    'BANNED'
}

export class UserFreelancrFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public phone?: string,
        public address?: string,
        public birthDate?: any,
        public weeklyAvailability?: number,
        public ranking?: number,
        public status?: UserStatus,
        public linkedInUser?: string,
        public gitUser?: string,
        public paypalAccount?: string,
        public user?: User,
        public userLogin?: string,
        public userId?: number,
        public skills?: SkillFreelancr[],
        public personalLink?: string,
        public resumeLink?: string
    ) {
    }
}
