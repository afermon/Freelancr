import { Route } from '@angular/router';

import { NewProjectComponent } from './new-project.component';

export const newProjectRoute: Route = {
    path: 'new-project',
    component: NewProjectComponent,
    data: {
        pageTitle: 'dashboard.title'
    }
};
