import { BaseEntity } from './../../shared';

export const enum MessageStatus {
    'NEW',
    'READ'
}

export class ApplicationMessageFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public message?: string,
        public status?: MessageStatus,
        public applicationId?: number,
        public senderLogin?: string,
        public senderId?: number,
        public receiverLogin?: string,
        public receiverId?: number,
    ) {
    }
}
