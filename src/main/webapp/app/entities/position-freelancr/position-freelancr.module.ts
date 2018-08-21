import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    PositionFreelancrService,
    PositionFreelancrPopupService,
    PositionFreelancrComponent,
    PositionFreelancrDetailComponent,
    PositionFreelancrDialogComponent,
    PositionFreelancrPopupComponent,
    PositionFreelancrDeletePopupComponent,
    PositionFreelancrDeleteDialogComponent,
    positionRoute,
    positionPopupRoute,
    PositionFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...positionRoute,
    ...positionPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PositionFreelancrComponent,
        PositionFreelancrDetailComponent,
        PositionFreelancrDialogComponent,
        PositionFreelancrDeleteDialogComponent,
        PositionFreelancrPopupComponent,
        PositionFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        PositionFreelancrComponent,
        PositionFreelancrDialogComponent,
        PositionFreelancrPopupComponent,
        PositionFreelancrDeleteDialogComponent,
        PositionFreelancrDeletePopupComponent,
    ],
    providers: [
        PositionFreelancrService,
        PositionFreelancrPopupService,
        PositionFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrPositionFreelancrModule {}
