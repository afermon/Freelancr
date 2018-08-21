import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GoalFreelancrComponent } from './goal-freelancr.component';
import { GoalFreelancrDetailComponent } from './goal-freelancr-detail.component';
import { GoalFreelancrPopupComponent } from './goal-freelancr-dialog.component';
import { GoalFreelancrDeletePopupComponent } from './goal-freelancr-delete-dialog.component';

@Injectable()
export class GoalFreelancrResolvePagingParams implements Resolve<any> {

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

export const goalRoute: Routes = [
    {
        path: 'cms/goal-freelancr',
        component: GoalFreelancrComponent,
        resolve: {
            'pagingParams': GoalFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.goal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/goal-freelancr/:id',
        component: GoalFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.goal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const goalPopupRoute: Routes = [
    {
        path: 'cms/goal-freelancr-new',
        component: GoalFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.goal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/goal-freelancr/:id/edit',
        component: GoalFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.goal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/goal-freelancr/:id/delete',
        component: GoalFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.goal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
