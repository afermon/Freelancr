import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionTierFreelancr } from './subscription-tier-freelancr.model';
import { SubscriptionTierFreelancrPopupService } from './subscription-tier-freelancr-popup.service';
import { SubscriptionTierFreelancrService } from './subscription-tier-freelancr.service';

@Component({
    selector: 'jhi-subscription-tier-freelancr-delete-dialog',
    templateUrl: './subscription-tier-freelancr-delete-dialog.component.html'
})
export class SubscriptionTierFreelancrDeleteDialogComponent {

    subscriptionTier: SubscriptionTierFreelancr;

    constructor(
        private subscriptionTierService: SubscriptionTierFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subscriptionTierService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subscriptionTierListModification',
                content: 'Deleted an subscriptionTier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subscription-tier-freelancr-delete-popup',
    template: ''
})
export class SubscriptionTierFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionTierPopupService: SubscriptionTierFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subscriptionTierPopupService
                .open(SubscriptionTierFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
