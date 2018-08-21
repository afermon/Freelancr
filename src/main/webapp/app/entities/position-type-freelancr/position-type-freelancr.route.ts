import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PositionTypeFreelancrComponent } from './position-type-freelancr.component';
import { PositionTypeFreelancrDetailComponent } from './position-type-freelancr-detail.component';
import { PositionTypeFreelancrPopupComponent } from './position-type-freelancr-dialog.component';
import { PositionTypeFreelancrDeletePopupComponent } from './position-type-freelancr-delete-dialog.component';

@Injectable()
export class PositionTypeFreelancrResolvePagingParams implements Resolve<any> {

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

export const positionTypeRoute: Routes = [
    {
        path: 'cms/position-type-freelancr',
        component: PositionTypeFreelancrComponent,
        resolve: {
            'pagingParams': PositionTypeFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.positionType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/position-type-freelancr/:id',
        component: PositionTypeFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.positionType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const positionTypePopupRoute: Routes = [
    {
        path: 'cms/position-type-freelancr-new',
        component: PositionTypeFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.positionType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/position-type-freelancr/:id/edit',
        component: PositionTypeFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.positionType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/position-type-freelancr/:id/delete',
        component: PositionTypeFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.positionType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
