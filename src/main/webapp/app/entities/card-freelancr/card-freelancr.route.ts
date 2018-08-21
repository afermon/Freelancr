import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CardFreelancrComponent } from './card-freelancr.component';
import { CardFreelancrDetailComponent } from './card-freelancr-detail.component';
import { CardFreelancrPopupComponent } from './card-freelancr-dialog.component';
import { CardFreelancrDeletePopupComponent } from './card-freelancr-delete-dialog.component';

@Injectable()
export class CardFreelancrResolvePagingParams implements Resolve<any> {

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

export const cardRoute: Routes = [
    {
        path: 'cms/card-freelancr',
        component: CardFreelancrComponent,
        resolve: {
            'pagingParams': CardFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.card.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/card-freelancr/:id',
        component: CardFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.card.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardPopupRoute: Routes = [
    {
        path: 'cms/card-freelancr-new',
        component: CardFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/card-freelancr/:id/edit',
        component: CardFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/card-freelancr/:id/delete',
        component: CardFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
