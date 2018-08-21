import {BaseEntity} from '../../shared/index';

export class GithubCommit implements BaseEntity {
    constructor(
        public id?: number,
        public sha?: string,
        public meesage?: string
    ) {
    }
}
