import { BaseEntity, User } from './../../shared';

export const enum SkillLevel {
    'JUNIOR',
    'MID_LEVEL',
    'SENIOR',
    'SME',
    'NO_EXPERIENCE'
}

export class SkillFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public level?: SkillLevel,
        public typeName?: string,
        public typeId?: number,
        public users?: User[],
    ) {
    }
}
