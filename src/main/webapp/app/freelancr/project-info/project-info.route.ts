import {Route} from '@angular/router';
import {ProjectInfoComponent} from './project-info.component';

export const projectInfoRoutes: Route = {
    path: 'project-info/:id',
    component: ProjectInfoComponent,
    data: {
        authorities: [],
        pageTitle: 'dashboard.title'
    }
};
