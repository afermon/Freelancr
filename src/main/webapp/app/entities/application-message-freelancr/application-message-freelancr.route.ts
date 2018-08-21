import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ApplicationMessageFreelancrComponent } from './application-message-freelancr.component';
import { ApplicationMessageFreelancrDetailComponent } from './application-message-freelancr-detail.component';
import { ApplicationMessageFreelancrPopupComponent } from './application-message-freelancr-dialog.component';
import { ApplicationMessageFreelancrDeletePopupComponent } from './application-message-freelancr-delete-dialog.component';

@Injectable()
export class ApplicationMessageFreelancrResolvePagingParams implements Resolve<any> {

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

export const applicationMessageRoute: Routes = [
    {
        path: 'cms/application-message-freelancr',
        component: ApplicationMessageFreelancrComponent,
        resolve: {
            'pagingParams': ApplicationMessageFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.applicationMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/application-message-freelancr/:id',
        component: ApplicationMessageFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.applicationMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationMessagePopupRoute: Routes = [
    {
        path: 'cms/application-message-freelancr-new',
        component: ApplicationMessageFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.applicationMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/application-message-freelancr/:id/edit',
        component: ApplicationMessageFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.applicationMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/application-message-freelancr/:id/delete',
        component: ApplicationMessageFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.applicationMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
