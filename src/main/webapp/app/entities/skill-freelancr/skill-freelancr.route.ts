import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SkillFreelancrComponent } from './skill-freelancr.component';
import { SkillFreelancrDetailComponent } from './skill-freelancr-detail.component';
import { SkillFreelancrPopupComponent } from './skill-freelancr-dialog.component';
import { SkillFreelancrDeletePopupComponent } from './skill-freelancr-delete-dialog.component';

@Injectable()
export class SkillFreelancrResolvePagingParams implements Resolve<any> {

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

export const skillRoute: Routes = [
    {
        path: 'cms/skill-freelancr',
        component: SkillFreelancrComponent,
        resolve: {
            'pagingParams': SkillFreelancrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cms/skill-freelancr/:id',
        component: SkillFreelancrDetailComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skillPopupRoute: Routes = [
    {
        path: 'cms/skill-freelancr-new',
        component: SkillFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/skill-freelancr/:id/edit',
        component: SkillFreelancrPopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cms/skill-freelancr/:id/delete',
        component: SkillFreelancrDeletePopupComponent,
        data: {
            authorities: ['ROLE_FREELANCR_ADMIN'],
            pageTitle: 'freelancrApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
