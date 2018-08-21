import { BaseEntity, User } from './../../shared';

export class SubscriptionTierFreelancr implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: number,
        public users?: User[],
    ) {
    }
}
