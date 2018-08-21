import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SkillTypeFreelancrComponent } from './skill-type-freelancr.component';
import { SkillTypeFreelancrDetailComponent } from './skill-type-freelancr-detail.component';
import { SkillTypeFreelancrPopupComponent } from './skill-type-freelancr-dialog.component';
import { SkillTypeFreelancrDeletePopupComponent } from './skill-type-freelancr-delete-dialog.component';

@Injectable()
export class SkillTypeFreelancrResolvePagingParams implements Resolve<any> {

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

export const skillTypeRoute: Routes = [
    {
        path: 'cms/skill-type-freelancr',
        component: SkillTypeFreelancrComponent,
        resolve: {
            'pagingParams': SkillTypeFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skillType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/skill-type-freelancr/:id',
        component: SkillTypeFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skillType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skillTypePopupRoute: Routes = [
    {
        path: 'cms/skill-type-freelancr-new',
        component: SkillTypeFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skillType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/skill-type-freelancr/:id/edit',
        component: SkillTypeFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skillType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/skill-type-freelancr/:id/delete',
        component: SkillTypeFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skillType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
