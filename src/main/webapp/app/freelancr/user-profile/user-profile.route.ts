import {ActivatedRouteSnapshot, Resolve, Route, RouterStateSnapshot} from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import {Injectable} from '@angular/core';
import {JhiPaginationUtil} from 'ng-jhipster';

@Injectable()
export class UserProfileResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const userProfileRoute: Route = {
    path: 'profile',
    component: UserProfileComponent,
    data: {
        pageTitle: 'dashboard.title'
    }
};
