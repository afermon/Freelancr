import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreelancrSharedModule } from '../../shared';
import { FreelancrAdminModule } from '../../admin/admin.module';
import {
    SubscriptionTierFreelancrService,
    SubscriptionTierFreelancrPopupService,
    SubscriptionTierFreelancrComponent,
    SubscriptionTierFreelancrDetailComponent,
    SubscriptionTierFreelancrDialogComponent,
    SubscriptionTierFreelancrPopupComponent,
    SubscriptionTierFreelancrDeletePopupComponent,
    SubscriptionTierFreelancrDeleteDialogComponent,
    subscriptionTierRoute,
    subscriptionTierPopupRoute,
    SubscriptionTierFreelancrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...subscriptionTierRoute,
    ...subscriptionTierPopupRoute,
];

@NgModule({
    imports: [
        FreelancrSharedModule,
        FreelancrAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubscriptionTierFreelancrComponent,
        SubscriptionTierFreelancrDetailComponent,
        SubscriptionTierFreelancrDialogComponent,
        SubscriptionTierFreelancrDeleteDialogComponent,
        SubscriptionTierFreelancrPopupComponent,
        SubscriptionTierFreelancrDeletePopupComponent,
    ],
    entryComponents: [
        SubscriptionTierFreelancrComponent,
        SubscriptionTierFreelancrDialogComponent,
        SubscriptionTierFreelancrPopupComponent,
        SubscriptionTierFreelancrDeleteDialogComponent,
        SubscriptionTierFreelancrDeletePopupComponent,
    ],
    providers: [
        SubscriptionTierFreelancrService,
        SubscriptionTierFreelancrPopupService,
        SubscriptionTierFreelancrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FreelancrSubscriptionTierFreelancrModule {}
