import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SubscriptionTierFreelancr } from './subscription-tier-freelancr.model';
import { SubscriptionTierFreelancrService } from './subscription-tier-freelancr.service';

@Injectable()
export class SubscriptionTierFreelancrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private subscriptionTierService: SubscriptionTierFreelancrService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.subscriptionTierService.find(id)
                    .subscribe((subscriptionTierResponse: HttpResponse<SubscriptionTierFreelancr>) => {
                        const subscriptionTier: SubscriptionTierFreelancr = subscriptionTierResponse.body;
                        this.ngbModalRef = this.subscriptionTierModalRef(component, subscriptionTier);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.subscriptionTierModalRef(component, new SubscriptionTierFreelancr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    subscriptionTierModalRef(component: Component, subscriptionTier: SubscriptionTierFreelancr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.subscriptionTier = subscriptionTier;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
