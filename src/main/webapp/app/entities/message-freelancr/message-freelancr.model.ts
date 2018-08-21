import { BaseEntity } from './../../shared';

export const enum MessageStatus {
    'NEW',
    'READ'
}

export class MessageFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public timestamp?: any,
        public topic?: string,
        public message?: string,
        public status?: MessageStatus,
        public replyId?: number,
        public senderLogin?: string,
        public senderId?: number,
        public receiverLogin?: string,
        public receiverId?: number,
    ) {
    }
}
