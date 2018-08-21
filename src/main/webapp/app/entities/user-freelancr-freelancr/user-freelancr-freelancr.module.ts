import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    UserFreelancrFreelancrService,
    UserFreelancrFreelancrPopupService,
    UserFreelancrFreelancrComponent,
    UserFreelancrFreelancrDetailComponent,
    UserFreelancrFreelancrDialogComponent,
    UserFreelancrFreelancrPopupComponent,
    UserFreelancrFreelancrDeletePopupComponent,
    UserFreelancrFreelancrDeleteDialogComponent,
    userFreelancrRoute,
    userFreelancrPopupRoute,
    UserFreelancrFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userFreelancrRoute,
    ...userFreelancrPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserFreelancrFreelancrComponent,
        UserFreelancrFreelancrDetailComponent,
        UserFreelancrFreelancrDialogComponent,
        UserFreelancrFreelancrDeleteDialogComponent,
        UserFreelancrFreelancrPopupComponent,
        UserFreelancrFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        UserFreelancrFreelancrComponent,
        UserFreelancrFreelancrDialogComponent,
        UserFreelancrFreelancrPopupComponent,
        UserFreelancrFreelancrDeleteDialogComponent,
        UserFreelancrFreelancrDeletePopupComponent,
    ],
    providers: [
        UserFreelancrFreelancrService,
        UserFreelancrFreelancrPopupService,
        UserFreelancrFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrUserFreelancrFreelancrModule {}
