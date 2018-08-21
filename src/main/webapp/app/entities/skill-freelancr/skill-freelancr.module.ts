import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    SkillFreelancrService,
    SkillFreelancrPopupService,
    SkillFreelancrComponent,
    SkillFreelancrDetailComponent,
    SkillFreelancrDialogComponent,
    SkillFreelancrPopupComponent,
    SkillFreelancrDeletePopupComponent,
    SkillFreelancrDeleteDialogComponent,
    skillRoute,
    skillPopupRoute,
    SkillFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...skillRoute,
    ...skillPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SkillFreelancrComponent,
        SkillFreelancrDetailComponent,
        SkillFreelancrDialogComponent,
        SkillFreelancrDeleteDialogComponent,
        SkillFreelancrPopupComponent,
        SkillFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        SkillFreelancrComponent,
        SkillFreelancrDialogComponent,
        SkillFreelancrPopupComponent,
        SkillFreelancrDeleteDialogComponent,
        SkillFreelancrDeletePopupComponent,
    ],
    providers: [
        SkillFreelancrService,
        SkillFreelancrPopupService,
        SkillFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrSkillFreelancrModule {}
