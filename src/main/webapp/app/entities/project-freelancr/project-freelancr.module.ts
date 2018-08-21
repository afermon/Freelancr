import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    ProjectFreelancrService,
    ProjectFreelancrPopupService,
    ProjectFreelancrComponent,
    ProjectFreelancrDetailComponent,
    ProjectFreelancrDialogComponent,
    ProjectFreelancrPopupComponent,
    ProjectFreelancrDeletePopupComponent,
    ProjectFreelancrDeleteDialogComponent,
    projectRoute,
    projectPopupRoute,
    ProjectFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...projectRoute,
    ...projectPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProjectFreelancrComponent,
        ProjectFreelancrDetailComponent,
        ProjectFreelancrDialogComponent,
        ProjectFreelancrDeleteDialogComponent,
        ProjectFreelancrPopupComponent,
        ProjectFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        ProjectFreelancrComponent,
        ProjectFreelancrDialogComponent,
        ProjectFreelancrPopupComponent,
        ProjectFreelancrDeleteDialogComponent,
        ProjectFreelancrDeletePopupComponent,
    ],
    providers: [
        ProjectFreelancrService,
        ProjectFreelancrPopupService,
        ProjectFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrProjectFreelancrModule {}
