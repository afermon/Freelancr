import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ApplicationFreelancrComponent } from './application-freelancr.component';
import { ApplicationFreelancrDetailComponent } from './application-freelancr-detail.component';
import { ApplicationFreelancrPopupComponent } from './application-freelancr-dialog.component';
import { ApplicationFreelancrDeletePopupComponent } from './application-freelancr-delete-dialog.component';

@Injectable()
export class ApplicationFreelancrResolvePagingParams implements Resolve<any> {

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

export const applicationRoute: Routes = [
    {
        path: 'cms/application-freelancr',
        component: ApplicationFreelancrComponent,
        resolve: {
            'pagingParams': ApplicationFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.application.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/application-freelancr/:id',
        component: ApplicationFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.application.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationPopupRoute: Routes = [
    {
        path: 'cms/application-freelancr-new',
        component: ApplicationFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.application.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/application-freelancr/:id/edit',
        component: ApplicationFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.application.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/application-freelancr/:id/delete',
        component: ApplicationFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.application.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
