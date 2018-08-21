import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CommentFreelancrComponent } from './comment-freelancr.component';
import { CommentFreelancrDetailComponent } from './comment-freelancr-detail.component';
import { CommentFreelancrPopupComponent } from './comment-freelancr-dialog.component';
import { CommentFreelancrDeletePopupComponent } from './comment-freelancr-delete-dialog.component';

@Injectable()
export class CommentFreelancrResolvePagingParams implements Resolve<any> {

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

export const commentRoute: Routes = [
    {
        path: 'cms/comment-freelancr',
        component: CommentFreelancrComponent,
        resolve: {
            'pagingParams': CommentFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/comment-freelancr/:id',
        component: CommentFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentPopupRoute: Routes = [
    {
        path: 'cms/comment-freelancr-new',
        component: CommentFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/comment-freelancr/:id/edit',
        component: CommentFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/comment-freelancr/:id/delete',
        component: CommentFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
