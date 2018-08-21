import { Route } from '@angular/router';

import { OfferPositionComponent } from './offer-position.component';

export const offerPositionRoute: Route = {
    path: 'offerPosition/:id',
    component: OfferPositionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.title'
    }
};
