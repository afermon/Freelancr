import { BaseEntity } from './../../shared';

export class GoalFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public projectTitle?: string,
        public projectId?: number,
    ) {
    }
}
