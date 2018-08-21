import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    ApplicationFreelancrService,
    ApplicationFreelancrPopupService,
    ApplicationFreelancrComponent,
    ApplicationFreelancrDetailComponent,
    ApplicationFreelancrDialogComponent,
    ApplicationFreelancrPopupComponent,
    ApplicationFreelancrDeletePopupComponent,
    ApplicationFreelancrDeleteDialogComponent,
    applicationRoute,
    applicationPopupRoute,
    ApplicationFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...applicationRoute,
    ...applicationPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ApplicationFreelancrComponent,
        ApplicationFreelancrDetailComponent,
        ApplicationFreelancrDialogComponent,
        ApplicationFreelancrDeleteDialogComponent,
        ApplicationFreelancrPopupComponent,
        ApplicationFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        ApplicationFreelancrComponent,
        ApplicationFreelancrDialogComponent,
        ApplicationFreelancrPopupComponent,
        ApplicationFreelancrDeleteDialogComponent,
        ApplicationFreelancrDeletePopupComponent,
    ],
    providers: [
        ApplicationFreelancrService,
        ApplicationFreelancrPopupService,
        ApplicationFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrApplicationFreelancrModule {}
