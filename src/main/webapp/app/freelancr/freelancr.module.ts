import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {
    freelancrState,
    BoardComponent,
    InboxComponent,
    UserProfileComponent,
    NewProjectComponent,
    SearchComponent,
    UserProfilePublicComponent,
    SearchResolvePagingParams,
    ApplyPositionComponent
} from './';
import {FreelancrSharedModule} from '../shared';
import {DragulaModule} from 'ng2-dragula';
import {SkillSearchComponent} from './skill-search/skill-search.component';
import {ProjectInfoComponent} from './project-info/project-info.component';
import {OfferPositionComponent} from './offer-position/offer-position.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {ProjectCommentComponent} from './project-comment/project-comment.component';
import {ProjectStatusComponent} from './project-status/project-status.component';
import {UploadFileService} from './upload-file.service';
import {QuillModule} from 'ngx-quill';
import {DndModule} from 'ngx-drag-drop';
import {UserFeedbackComponent} from './user-feedback/user-feedback.component';

@NgModule({
    imports: [
        FreelancrSharedModule,
        RouterModule.forChild(freelancrState),
        DragulaModule,
        CurrencyMaskModule,
        QuillModule,
        DndModule
    ],
    declarations: [
        DashboardComponent,
        BoardComponent,
        InboxComponent,
        UserProfileComponent,
        NewProjectComponent,
        SkillSearchComponent,
        UserProfilePublicComponent,
        ProjectInfoComponent,
        SearchComponent,
        ApplyPositionComponent,
        OfferPositionComponent,
        ProjectCommentComponent,
        ProjectStatusComponent,
        UserFeedbackComponent
    ],
    providers: [
        SearchResolvePagingParams,
        UploadFileService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrModule {
}
