import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    NotificationFreelancrService,
    NotificationFreelancrPopupService,
    NotificationFreelancrComponent,
    NotificationFreelancrDetailComponent,
    NotificationFreelancrDialogComponent,
    NotificationFreelancrPopupComponent,
    NotificationFreelancrDeletePopupComponent,
    NotificationFreelancrDeleteDialogComponent,
    notificationRoute,
    notificationPopupRoute,
    NotificationFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...notificationRoute,
    ...notificationPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NotificationFreelancrComponent,
        NotificationFreelancrDetailComponent,
        NotificationFreelancrDialogComponent,
        NotificationFreelancrDeleteDialogComponent,
        NotificationFreelancrPopupComponent,
        NotificationFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        NotificationFreelancrComponent,
        NotificationFreelancrDialogComponent,
        NotificationFreelancrPopupComponent,
        NotificationFreelancrDeleteDialogComponent,
        NotificationFreelancrDeletePopupComponent,
    ],
    providers: [
        NotificationFreelancrService,
        NotificationFreelancrPopupService,
        NotificationFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrNotificationFreelancrModule {}
