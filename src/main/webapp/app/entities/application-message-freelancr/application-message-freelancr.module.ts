import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    ApplicationMessageFreelancrService,
    ApplicationMessageFreelancrPopupService,
    ApplicationMessageFreelancrComponent,
    ApplicationMessageFreelancrDetailComponent,
    ApplicationMessageFreelancrDialogComponent,
    ApplicationMessageFreelancrPopupComponent,
    ApplicationMessageFreelancrDeletePopupComponent,
    ApplicationMessageFreelancrDeleteDialogComponent,
    applicationMessageRoute,
    applicationMessagePopupRoute,
    ApplicationMessageFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...applicationMessageRoute,
    ...applicationMessagePopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ApplicationMessageFreelancrComponent,
        ApplicationMessageFreelancrDetailComponent,
        ApplicationMessageFreelancrDialogComponent,
        ApplicationMessageFreelancrDeleteDialogComponent,
        ApplicationMessageFreelancrPopupComponent,
        ApplicationMessageFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        ApplicationMessageFreelancrComponent,
        ApplicationMessageFreelancrDialogComponent,
        ApplicationMessageFreelancrPopupComponent,
        ApplicationMessageFreelancrDeleteDialogComponent,
        ApplicationMessageFreelancrDeletePopupComponent,
    ],
    providers: [
        ApplicationMessageFreelancrService,
        ApplicationMessageFreelancrPopupService,
        ApplicationMessageFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrApplicationMessageFreelancrModule {}
