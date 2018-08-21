import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PositionFreelancrComponent } from './position-freelancr.component';
import { PositionFreelancrDetailComponent } from './position-freelancr-detail.component';
import { PositionFreelancrPopupComponent } from './position-freelancr-dialog.component';
import { PositionFreelancrDeletePopupComponent } from './position-freelancr-delete-dialog.component';

@Injectable()
export class PositionFreelancrResolvePagingParams implements Resolve<any> {

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

export const positionRoute: Routes = [
    {
        path: 'cms/position-freelancr',
        component: PositionFreelancrComponent,
        resolve: {
            'pagingParams': PositionFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.position.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/position-freelancr/:id',
        component: PositionFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.position.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const positionPopupRoute: Routes = [
    {
        path: 'cms/position-freelancr-new',
        component: PositionFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.position.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/position-freelancr/:id/edit',
        component: PositionFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.position.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/position-freelancr/:id/delete',
        component: PositionFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.position.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
