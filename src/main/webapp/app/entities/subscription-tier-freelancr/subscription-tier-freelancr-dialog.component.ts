import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubscriptionTierFreelancr } from './subscription-tier-freelancr.model';
import { SubscriptionTierFreelancrPopupService } from './subscription-tier-freelancr-popup.service';
import { SubscriptionTierFreelancrService } from './subscription-tier-freelancr.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-subscription-tier-freelancr-dialog',
    templateUrl: './subscription-tier-freelancr-dialog.component.html'
})
export class SubscriptionTierFreelancrDialogComponent implements OnInit {

    subscriptionTier: SubscriptionTierFreelancr;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subscriptionTierService: SubscriptionTierFreelancrService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subscriptionTier.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subscriptionTierService.update(this.subscriptionTier));
        } else {
            this.subscribeToSaveResponse(
                this.subscriptionTierService.create(this.subscriptionTier));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubscriptionTierFreelancr>>) {
        result.subscribe((res: HttpResponse<SubscriptionTierFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubscriptionTierFreelancr) {
        this.eventManager.broadcast({ name: 'subscriptionTierListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-subscription-tier-freelancr-popup',
    template: ''
})
export class SubscriptionTierFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionTierPopupService: SubscriptionTierFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subscriptionTierPopupService
                    .open(SubscriptionTierFreelancrDialogComponent as Component, params['id']);
            } else {
                this.subscriptionTierPopupService
                    .open(SubscriptionTierFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
