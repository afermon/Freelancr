import { BaseEntity } from './../../shared';

export class SkillTypeFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public logo?: string,
    ) {
    }
}
