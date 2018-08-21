import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import {
    SkillTypeFreelancrService,
    SkillTypeFreelancrPopupService,
    SkillTypeFreelancrComponent,
    SkillTypeFreelancrDetailComponent,
    SkillTypeFreelancrDialogComponent,
    SkillTypeFreelancrPopupComponent,
    SkillTypeFreelancrDeletePopupComponent,
    SkillTypeFreelancrDeleteDialogComponent,
    skillTypeRoute,
    skillTypePopupRoute,
    SkillTypeFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...skillTypeRoute,
    ...skillTypePopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SkillTypeFreelancrComponent,
        SkillTypeFreelancrDetailComponent,
        SkillTypeFreelancrDialogComponent,
        SkillTypeFreelancrDeleteDialogComponent,
        SkillTypeFreelancrPopupComponent,
        SkillTypeFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        SkillTypeFreelancrComponent,
        SkillTypeFreelancrDialogComponent,
        SkillTypeFreelancrPopupComponent,
        SkillTypeFreelancrDeleteDialogComponent,
        SkillTypeFreelancrDeletePopupComponent,
    ],
    providers: [
        SkillTypeFreelancrService,
        SkillTypeFreelancrPopupService,
        SkillTypeFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrSkillTypeFreelancrModule {}
