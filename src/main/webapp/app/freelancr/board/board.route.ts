import {Route} from '@angular/router';
import { BoardComponent } from './board.component';

export const boardRoute: Route = {
    path: 'board/:id',
    component: BoardComponent,
    data: {
        pageTitle: 'board.title'
    }
};
