import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import {
    PositionTypeFreelancrService,
    PositionTypeFreelancrPopupService,
    PositionTypeFreelancrComponent,
    PositionTypeFreelancrDetailComponent,
    PositionTypeFreelancrDialogComponent,
    PositionTypeFreelancrPopupComponent,
    PositionTypeFreelancrDeletePopupComponent,
    PositionTypeFreelancrDeleteDialogComponent,
    positionTypeRoute,
    positionTypePopupRoute,
    PositionTypeFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...positionTypeRoute,
    ...positionTypePopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PositionTypeFreelancrComponent,
        PositionTypeFreelancrDetailComponent,
        PositionTypeFreelancrDialogComponent,
        PositionTypeFreelancrDeleteDialogComponent,
        PositionTypeFreelancrPopupComponent,
        PositionTypeFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        PositionTypeFreelancrComponent,
        PositionTypeFreelancrDialogComponent,
        PositionTypeFreelancrPopupComponent,
        PositionTypeFreelancrDeleteDialogComponent,
        PositionTypeFreelancrDeletePopupComponent,
    ],
    providers: [
        PositionTypeFreelancrService,
        PositionTypeFreelancrPopupService,
        PositionTypeFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrPositionTypeFreelancrModule {}
