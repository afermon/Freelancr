import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    CardFreelancrService,
    CardFreelancrPopupService,
    CardFreelancrComponent,
    CardFreelancrDetailComponent,
    CardFreelancrDialogComponent,
    CardFreelancrPopupComponent,
    CardFreelancrDeletePopupComponent,
    CardFreelancrDeleteDialogComponent,
    cardRoute,
    cardPopupRoute,
    CardFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cardRoute,
    ...cardPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardFreelancrComponent,
        CardFreelancrDetailComponent,
        CardFreelancrDialogComponent,
        CardFreelancrDeleteDialogComponent,
        CardFreelancrPopupComponent,
        CardFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        CardFreelancrComponent,
        CardFreelancrDialogComponent,
        CardFreelancrPopupComponent,
        CardFreelancrDeleteDialogComponent,
        CardFreelancrDeletePopupComponent,
    ],
    providers: [
        CardFreelancrService,
        CardFreelancrPopupService,
        CardFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrCardFreelancrModule {}
