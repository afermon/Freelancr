import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    MessageFreelancrService,
    MessageFreelancrPopupService,
    MessageFreelancrComponent,
    MessageFreelancrDetailComponent,
    MessageFreelancrDialogComponent,
    MessageFreelancrPopupComponent,
    MessageFreelancrDeletePopupComponent,
    MessageFreelancrDeleteDialogComponent,
    messageRoute,
    messagePopupRoute,
    MessageFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...messageRoute,
    ...messagePopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MessageFreelancrComponent,
        MessageFreelancrDetailComponent,
        MessageFreelancrDialogComponent,
        MessageFreelancrDeleteDialogComponent,
        MessageFreelancrPopupComponent,
        MessageFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        MessageFreelancrComponent,
        MessageFreelancrDialogComponent,
        MessageFreelancrPopupComponent,
        MessageFreelancrDeleteDialogComponent,
        MessageFreelancrDeletePopupComponent,
    ],
    providers: [
        MessageFreelancrService,
        MessageFreelancrPopupService,
        MessageFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrMessageFreelancrModule {}
