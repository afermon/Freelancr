import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FreelancrUserFreelancrFreelancrModule } from './user-freelancr-freelancr/user-freelancr-freelancr.module';
import { FreelancrSkillFreelancrModule } from './skill-freelancr/skill-freelancr.module';
import { FreelancrSkillTypeFreelancrModule } from './skill-type-freelancr/skill-type-freelancr.module';
import { FreelancrLanguageFreelancrModule } from './language-freelancr/language-freelancr.module';
import { FreelancrProjectFreelancrModule } from './project-freelancr/project-freelancr.module';
import { FreelancrGoalFreelancrModule } from './goal-freelancr/goal-freelancr.module';
import { FreelancrFeedbackFreelancrModule } from './feedback-freelancr/feedback-freelancr.module';
import { FreelancrCardFreelancrModule } from './card-freelancr/card-freelancr.module';
import { FreelancrPositionFreelancrModule } from './position-freelancr/position-freelancr.module';
import { FreelancrPositionTypeFreelancrModule } from './position-type-freelancr/position-type-freelancr.module';
import { FreelancrApplicationFreelancrModule } from './application-freelancr/application-freelancr.module';
import { FreelancrApplicationMessageFreelancrModule } from './application-message-freelancr/application-message-freelancr.module';
import { FreelancrCommentFreelancrModule } from './comment-freelancr/comment-freelancr.module';
import { FreelancrMessageFreelancrModule } from './message-freelancr/message-freelancr.module';
import { FreelancrNotificationFreelancrModule } from './notification-freelancr/notification-freelancr.module';
import { FreelancrSubscriptionTierFreelancrModule } from './subscription-tier-freelancr/subscription-tier-freelancr.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FreelancrUserFreelancrFreelancrModule,
        FreelancrSkillFreelancrModule,
        FreelancrSkillTypeFreelancrModule,
        FreelancrLanguageFreelancrModule,
        FreelancrProjectFreelancrModule,
        FreelancrGoalFreelancrModule,
        FreelancrFeedbackFreelancrModule,
        FreelancrCardFreelancrModule,
        FreelancrPositionFreelancrModule,
        FreelancrPositionTypeFreelancrModule,
        FreelancrApplicationFreelancrModule,
        FreelancrApplicationMessageFreelancrModule,
        FreelancrCommentFreelancrModule,
        FreelancrMessageFreelancrModule,
        FreelancrNotificationFreelancrModule,
        FreelancrSubscriptionTierFreelancrModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrEntityModule {}
