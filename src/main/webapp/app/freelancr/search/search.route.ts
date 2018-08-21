import {ActivatedRouteSnapshot, Resolve, Route, RouterStateSnapshot} from '@angular/router';

import {Injectable} from '@angular/core';
import {JhiPaginationUtil} from 'ng-jhipster';
import {SearchComponent} from './search.component';

@Injectable()
export class SearchResolvePagingParams implements Resolve<any> {

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

export const searchRoute: Route = {
    path: 'search',
    component: SearchComponent,
    resolve: {
        'pagingParams': SearchResolvePagingParams
    },
    data: {
        pageTitle: 'freelancrApp.search.title'
    }
};
