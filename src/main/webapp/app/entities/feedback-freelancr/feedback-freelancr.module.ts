import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    FeedbackFreelancrService,
    FeedbackFreelancrPopupService,
    FeedbackFreelancrComponent,
    FeedbackFreelancrDetailComponent,
    FeedbackFreelancrDialogComponent,
    FeedbackFreelancrPopupComponent,
    FeedbackFreelancrDeletePopupComponent,
    FeedbackFreelancrDeleteDialogComponent,
    feedbackRoute,
    feedbackPopupRoute,
    FeedbackFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...feedbackRoute,
    ...feedbackPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FeedbackFreelancrComponent,
        FeedbackFreelancrDetailComponent,
        FeedbackFreelancrDialogComponent,
        FeedbackFreelancrDeleteDialogComponent,
        FeedbackFreelancrPopupComponent,
        FeedbackFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        FeedbackFreelancrComponent,
        FeedbackFreelancrDialogComponent,
        FeedbackFreelancrPopupComponent,
        FeedbackFreelancrDeleteDialogComponent,
        FeedbackFreelancrDeletePopupComponent,
    ],
    providers: [
        FeedbackFreelancrService,
        FeedbackFreelancrPopupService,
        FeedbackFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrFeedbackFreelancrModule {}
