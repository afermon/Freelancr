import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    CommentFreelancrService,
    CommentFreelancrPopupService,
    CommentFreelancrComponent,
    CommentFreelancrDetailComponent,
    CommentFreelancrDialogComponent,
    CommentFreelancrPopupComponent,
    CommentFreelancrDeletePopupComponent,
    CommentFreelancrDeleteDialogComponent,
    commentRoute,
    commentPopupRoute,
    CommentFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...commentRoute,
    ...commentPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommentFreelancrComponent,
        CommentFreelancrDetailComponent,
        CommentFreelancrDialogComponent,
        CommentFreelancrDeleteDialogComponent,
        CommentFreelancrPopupComponent,
        CommentFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        CommentFreelancrComponent,
        CommentFreelancrDialogComponent,
        CommentFreelancrPopupComponent,
        CommentFreelancrDeleteDialogComponent,
        CommentFreelancrDeletePopupComponent,
    ],
    providers: [
        CommentFreelancrService,
        CommentFreelancrPopupService,
        CommentFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrCommentFreelancrModule {}
