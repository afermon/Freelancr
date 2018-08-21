import { Route } from '@angular/router';

import { InboxComponent } from './inbox.component';

export const inboxRoute: Route = {
    path: 'inbox',
    component: InboxComponent,
    data: {
        pageTitle: 'inbox.title'
    }
};
