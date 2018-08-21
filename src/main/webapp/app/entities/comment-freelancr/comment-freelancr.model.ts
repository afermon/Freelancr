import { BaseEntity } from './../../shared';

export class CommentFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public timestamp?: any,
        public comment?: string,
        public userLogin?: string,
        public userId?: number,
        public projectTitle?: string,
        public projectId?: number,
    ) {
    }
}
