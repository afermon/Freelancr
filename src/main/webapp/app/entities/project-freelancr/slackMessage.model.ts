import {BaseEntity} from '../../shared/index';

export class SlackMessage implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public ts?: number,
        public user?: string,
        public text?: string,
        public username?: string
    ) {
    }
}
