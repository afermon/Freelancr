import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserFreelancrFreelancr } from './user-freelancr-freelancr.model';
import { UserFreelancrFreelancrService } from './user-freelancr-freelancr.service';

@Injectable()
export class UserFreelancrFreelancrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userFreelancrService: UserFreelancrFreelancrService

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
                this.userFreelancrService.find(id)
                    .subscribe((userFreelancrResponse: HttpResponse<UserFreelancrFreelancr>) => {
                        const userFreelancr: UserFreelancrFreelancr = userFreelancrResponse.body;
                        if (userFreelancr.birthDate) {
                            userFreelancr.birthDate = {
                                year: userFreelancr.birthDate.getFullYear(),
                                month: userFreelancr.birthDate.getMonth() + 1,
                                day: userFreelancr.birthDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.userFreelancrModalRef(component, userFreelancr);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userFreelancrModalRef(component, new UserFreelancrFreelancr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userFreelancrModalRef(component: Component, userFreelancr: UserFreelancrFreelancr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userFreelancr = userFreelancr;
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
