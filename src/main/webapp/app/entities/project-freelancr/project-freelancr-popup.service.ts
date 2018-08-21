import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProjectFreelancr } from './project-freelancr.model';
import { ProjectFreelancrService } from './project-freelancr.service';

@Injectable()
export class ProjectFreelancrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private projectService: ProjectFreelancrService

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
                this.projectService.find(id)
                    .subscribe((projectResponse: HttpResponse<ProjectFreelancr>) => {
                        const project: ProjectFreelancr = projectResponse.body;
                        if (project.deadline) {
                            project.deadline = {
                                year: project.deadline.getFullYear(),
                                month: project.deadline.getMonth() + 1,
                                day: project.deadline.getDate()
                            };
                        }
                        if (project.startDate) {
                            project.startDate = {
                                year: project.startDate.getFullYear(),
                                month: project.startDate.getMonth() + 1,
                                day: project.startDate.getDate()
                            };
                        }
                        if (project.endDate) {
                            project.endDate = {
                                year: project.endDate.getFullYear(),
                                month: project.endDate.getMonth() + 1,
                                day: project.endDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.projectModalRef(component, project);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.projectModalRef(component, new ProjectFreelancr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    projectModalRef(component: Component, project: ProjectFreelancr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.project = project;
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
