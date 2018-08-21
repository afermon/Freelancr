import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MessageFreelancrComponent } from './message-freelancr.component';
import { MessageFreelancrDetailComponent } from './message-freelancr-detail.component';
import { MessageFreelancrPopupComponent } from './message-freelancr-dialog.component';
import { MessageFreelancrDeletePopupComponent } from './message-freelancr-delete-dialog.component';

@Injectable()
export class MessageFreelancrResolvePagingParams implements Resolve<any> {

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

export const messageRoute: Routes = [
    {
        path: 'cms/message-freelancr',
        component: MessageFreelancrComponent,
        resolve: {
            'pagingParams': MessageFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/message-freelancr/:id',
        component: MessageFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messagePopupRoute: Routes = [
    {
        path: 'cms/message-freelancr-new',
        component: MessageFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/message-freelancr/:id/edit',
        component: MessageFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/message-freelancr/:id/delete',
        component: MessageFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'freelancrApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
