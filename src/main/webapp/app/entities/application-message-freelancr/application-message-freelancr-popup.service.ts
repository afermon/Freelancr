import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ApplicationMessageFreelancr } from './application-message-freelancr.model';
import { ApplicationMessageFreelancrService } from './application-message-freelancr.service';

@Injectable()
export class ApplicationMessageFreelancrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private applicationMessageService: ApplicationMessageFreelancrService

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
                this.applicationMessageService.find(id)
                    .subscribe((applicationMessageResponse: HttpResponse<ApplicationMessageFreelancr>) => {
                        const applicationMessage: ApplicationMessageFreelancr = applicationMessageResponse.body;
                        this.ngbModalRef = this.applicationMessageModalRef(component, applicationMessage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.applicationMessageModalRef(component, new ApplicationMessageFreelancr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    applicationMessageModalRef(component: Component, applicationMessage: ApplicationMessageFreelancr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.applicationMessage = applicationMessage;
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
