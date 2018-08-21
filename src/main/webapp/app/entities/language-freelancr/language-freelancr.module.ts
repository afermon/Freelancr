import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    LanguageFreelancrService,
    LanguageFreelancrPopupService,
    LanguageFreelancrComponent,
    LanguageFreelancrDetailComponent,
    LanguageFreelancrDialogComponent,
    LanguageFreelancrPopupComponent,
    LanguageFreelancrDeletePopupComponent,
    LanguageFreelancrDeleteDialogComponent,
    languageRoute,
    languagePopupRoute,
    LanguageFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...languageRoute,
    ...languagePopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LanguageFreelancrComponent,
        LanguageFreelancrDetailComponent,
        LanguageFreelancrDialogComponent,
        LanguageFreelancrDeleteDialogComponent,
        LanguageFreelancrPopupComponent,
        LanguageFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        LanguageFreelancrComponent,
        LanguageFreelancrDialogComponent,
        LanguageFreelancrPopupComponent,
        LanguageFreelancrDeleteDialogComponent,
        LanguageFreelancrDeletePopupComponent,
    ],
    providers: [
        LanguageFreelancrService,
        LanguageFreelancrPopupService,
        LanguageFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrLanguageFreelancrModule {}
