import {Route} from '@angular/router';

import { UserProfilePublicComponent } from './user-profile-public.component';

export const userProfilePublicRoute: Route = {
    path: 'public-profile/:id',
    component: UserProfilePublicComponent,
    data: {
        authorities: [],
        pageTitle: 'dashboard.title'
    }
};
