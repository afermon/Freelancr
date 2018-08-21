import {Routes} from '@angular/router';

import {
    dashboardRoute,
    boardRoute,
    inboxRoute,
    userProfileRoute,
    searchRoute,
    newProjectRoute,
    userProfilePublicRoute,
    projectInfoRoutes,
    applyPositionRoute
} from './';

import {UserRouteAccessService} from '../shared';
import {offerPositionRoute} from './offer-position/offer-position.route';

const FREELANCR_ROUTES = [
    dashboardRoute,
    boardRoute,
    inboxRoute,
    userProfileRoute,
    searchRoute,
    newProjectRoute,
    userProfilePublicRoute,
    projectInfoRoutes,
    applyPositionRoute,
    offerPositionRoute,
];

export const freelancrState: Routes = [{
    path: '',
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    children: FREELANCR_ROUTES
}
];
