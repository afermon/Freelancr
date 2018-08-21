import { BaseEntity } from './../../shared';

export class FeedbackFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public timeStamp?: any,
        public rating?: number,
        public comments?: string,
        public userLogin?: string,
        public userId?: number,
        public projectTitle?: string,
        public projectId?: number,
    ) {
    }
}
