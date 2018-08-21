import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionTierFreelancr } from './subscription-tier-freelancr.model';
import { SubscriptionTierFreelancrService } from './subscription-tier-freelancr.service';

@Component({
    selector: 'jhi-subscription-tier-freelancr-detail',
    templateUrl: './subscription-tier-freelancr-detail.component.html'
})
export class SubscriptionTierFreelancrDetailComponent implements OnInit, OnDestroy {

    subscriptionTier: SubscriptionTierFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subscriptionTierService: SubscriptionTierFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubscriptionTiers();
    }

    load(id) {
        this.subscriptionTierService.find(id)
            .subscribe((subscriptionTierResponse: HttpResponse<SubscriptionTierFreelancr>) => {
                this.subscriptionTier = subscriptionTierResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubscriptionTiers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subscriptionTierListModification',
            (response) => this.load(this.subscriptionTier.id)
        );
    }
}
