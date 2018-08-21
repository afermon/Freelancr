import { BaseEntity } from './../../shared';

export const enum MessageStatus {
    'NEW',
    'READ'
}

export class NotificationFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public timestamp?: any,
        public message?: string,
        public status?: MessageStatus,
        public userLogin?: string,
        public userId?: number,
    ) {
    }
}
