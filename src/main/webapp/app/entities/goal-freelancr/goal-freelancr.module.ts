import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import {
    GoalFreelancrService,
    GoalFreelancrPopupService,
    GoalFreelancrComponent,
    GoalFreelancrDetailComponent,
    GoalFreelancrDialogComponent,
    GoalFreelancrPopupComponent,
    GoalFreelancrDeletePopupComponent,
    GoalFreelancrDeleteDialogComponent,
    goalRoute,
    goalPopupRoute,
    GoalFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...goalRoute,
    ...goalPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GoalFreelancrComponent,
        GoalFreelancrDetailComponent,
        GoalFreelancrDialogComponent,
        GoalFreelancrDeleteDialogComponent,
        GoalFreelancrPopupComponent,
        GoalFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        GoalFreelancrComponent,
        GoalFreelancrDialogComponent,
        GoalFreelancrPopupComponent,
        GoalFreelancrDeleteDialogComponent,
        GoalFreelancrDeletePopupComponent,
    ],
    providers: [
        GoalFreelancrService,
        GoalFreelancrPopupService,
        GoalFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrGoalFreelancrModule {}
