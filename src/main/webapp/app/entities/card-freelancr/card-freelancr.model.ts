import { BaseEntity } from './../../shared';

export const enum CardStatus {
    'NEW',
    'IN_PROGRESS',
    'RESOLVED',
    'CLOSED',
    'PAYED'
}

export class CardFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public status?: CardStatus,
        public deadline?: any,
        public budget?: number,
        public userLogin?: string,
        public userId?: number,
        public projectTitle?: string,
        public projectId?: number,
        public positionId?: number,
    ) {
    }
}
