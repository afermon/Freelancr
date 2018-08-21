import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserFreelancrFreelancrComponent } from './user-freelancr-freelancr.component';
import { UserFreelancrFreelancrDetailComponent } from './user-freelancr-freelancr-detail.component';
import { UserFreelancrFreelancrPopupComponent } from './user-freelancr-freelancr-dialog.component';
import { UserFreelancrFreelancrDeletePopupComponent } from './user-freelancr-freelancr-delete-dialog.component';

@Injectable()
export class UserFreelancrFreelancrResolvePagingParams implements Resolve<any> {

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

export const userFreelancrRoute: Routes = [
    {
        path: 'cms/user-freelancr-freelancr',
        component: UserFreelancrFreelancrComponent,
        resolve: {
            'pagingParams': UserFreelancrFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.userFreelancr.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/user-freelancr-freelancr/:id',
        component: UserFreelancrFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.userFreelancr.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userFreelancrPopupRoute: Routes = [
    {
        path: 'cms/user-freelancr-freelancr-new',
        component: UserFreelancrFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.userFreelancr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/user-freelancr-freelancr/:id/edit',
        component: UserFreelancrFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.userFreelancr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/user-freelancr-freelancr/:id/delete',
        component: UserFreelancrFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.userFreelancr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
