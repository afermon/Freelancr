import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SubscriptionTierFreelancrComponent } from './subscription-tier-freelancr.component';
import { SubscriptionTierFreelancrDetailComponent } from './subscription-tier-freelancr-detail.component';
import { SubscriptionTierFreelancrPopupComponent } from './subscription-tier-freelancr-dialog.component';
import { SubscriptionTierFreelancrDeletePopupComponent } from './subscription-tier-freelancr-delete-dialog.component';

@Injectable()
export class SubscriptionTierFreelancrResolvePagingParams implements Resolve<any> {

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

export const subscriptionTierRoute: Routes = [
    {
        path: 'cms/subscription-tier-freelancr',
        component: SubscriptionTierFreelancrComponent,
        resolve: {
            'pagingParams': SubscriptionTierFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.subscriptionTier.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/subscription-tier-freelancr/:id',
        component: SubscriptionTierFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.subscriptionTier.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscriptionTierPopupRoute: Routes = [
    {
        path: 'cms/subscription-tier-freelancr-new',
        component: SubscriptionTierFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.subscriptionTier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/subscription-tier-freelancr/:id/edit',
        component: SubscriptionTierFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.subscriptionTier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/subscription-tier-freelancr/:id/delete',
        component: SubscriptionTierFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.subscriptionTier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
