import { BaseEntity, User } from './../../shared';

export class PositionFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public quantity?: number,
        public applications?: BaseEntity[],
        public cards?: BaseEntity[],
        public typeName?: string,
        public typeId?: number,
        public skills?: BaseEntity[],
        public hiredUsers?: User[],
        public projectTitle?: string,
        public projectId?: number,
    ) {
    }
}
