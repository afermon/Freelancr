import { Route } from '@angular/router';

import { ApplyPositionComponent } from './apply-position.component';

export const applyPositionRoute: Route = {
    path: 'position/:project/:id',
    component: ApplyPositionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.title'
    }
};
