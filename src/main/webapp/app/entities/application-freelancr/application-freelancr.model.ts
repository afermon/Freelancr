import { BaseEntity } from './../../shared';

export const enum ApplicationStatus {
    'APPLIED',
    'ACCEPTED',
    'REJECTED',
    'CANCELLED',
    'OFFERED'
}

export class ApplicationFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public status?: ApplicationStatus,
        public bid?: number,
        public messages?: BaseEntity[],
        public userLogin?: string,
        public userId?: number,
        public positionTitle?: string,
        public positionId?: number,
    ) {
    }
}
