import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SkillTypeFreelancr } from './skill-type-freelancr.model';
import { SkillTypeFreelancrService } from './skill-type-freelancr.service';

@Injectable()
export class SkillTypeFreelancrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private skillTypeService: SkillTypeFreelancrService

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
                this.skillTypeService.find(id)
                    .subscribe((skillTypeResponse: HttpResponse<SkillTypeFreelancr>) => {
                        const skillType: SkillTypeFreelancr = skillTypeResponse.body;
                        this.ngbModalRef = this.skillTypeModalRef(component, skillType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.skillTypeModalRef(component, new SkillTypeFreelancr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    skillTypeModalRef(component: Component, skillType: SkillTypeFreelancr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.skillType = skillType;
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
