import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FeedbackFreelancr } from './feedback-freelancr.model';
import { FeedbackFreelancrPopupService } from './feedback-freelancr-popup.service';
import { FeedbackFreelancrService } from './feedback-freelancr.service';
import { User, UserService } from '../../shared';
import { ProjectFreelancr, ProjectFreelancrService } from '../project-freelancr';

@Component({
    selector: 'jhi-feedback-freelancr-dialog',
    templateUrl: './feedback-freelancr-dialog.component.html'
})
export class FeedbackFreelancrDialogComponent implements OnInit {

    feedback: FeedbackFreelancr;
    isSaving: boolean;

    users: User[];

    projects: ProjectFreelancr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private feedbackService: FeedbackFreelancrService,
        private userService: UserService,
        private projectService: ProjectFreelancrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.projectService.query()
            .subscribe((res: HttpResponse<ProjectFreelancr[]>) => { this.projects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.feedback.id !== undefined) {
            this.subscribeToSaveResponse(
                this.feedbackService.update(this.feedback));
        } else {
            this.subscribeToSaveResponse(
                this.feedbackService.create(this.feedback));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FeedbackFreelancr>>) {
        result.subscribe((res: HttpResponse<FeedbackFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FeedbackFreelancr) {
        this.eventManager.broadcast({ name: 'feedbackListModification', content: 'OK'});
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

    trackProjectById(index: number, item: ProjectFreelancr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-feedback-freelancr-popup',
    template: ''
})
export class FeedbackFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private feedbackPopupService: FeedbackFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.feedbackPopupService
                    .open(FeedbackFreelancrDialogComponent as Component, params['id']);
            } else {
                this.feedbackPopupService
                    .open(FeedbackFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
