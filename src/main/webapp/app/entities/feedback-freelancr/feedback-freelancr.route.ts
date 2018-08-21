import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FeedbackFreelancrComponent } from './feedback-freelancr.component';
import { FeedbackFreelancrDetailComponent } from './feedback-freelancr-detail.component';
import { FeedbackFreelancrPopupComponent } from './feedback-freelancr-dialog.component';
import { FeedbackFreelancrDeletePopupComponent } from './feedback-freelancr-delete-dialog.component';

@Injectable()
export class FeedbackFreelancrResolvePagingParams implements Resolve<any> {

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

export const feedbackRoute: Routes = [
    {
        path: 'cms/feedback-freelancr',
        component: FeedbackFreelancrComponent,
        resolve: {
            'pagingParams': FeedbackFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.feedback.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/feedback-freelancr/:id',
        component: FeedbackFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.feedback.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const feedbackPopupRoute: Routes = [
    {
        path: 'cms/feedback-freelancr-new',
        component: FeedbackFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.feedback.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/feedback-freelancr/:id/edit',
        component: FeedbackFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.feedback.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/feedback-freelancr/:id/delete',
        component: FeedbackFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.feedback.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
