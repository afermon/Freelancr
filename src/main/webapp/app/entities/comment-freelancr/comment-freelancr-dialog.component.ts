import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentFreelancr } from './comment-freelancr.model';
import { CommentFreelancrPopupService } from './comment-freelancr-popup.service';
import { CommentFreelancrService } from './comment-freelancr.service';
import { User, UserService } from '../../shared';
import { ProjectFreelancr, ProjectFreelancrService } from '../project-freelancr';

@Component({
    selector: 'jhi-comment-freelancr-dialog',
    templateUrl: './comment-freelancr-dialog.component.html'
})
export class CommentFreelancrDialogComponent implements OnInit {

    comment: CommentFreelancr;
    isSaving: boolean;

    users: User[];

    projects: ProjectFreelancr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private commentService: CommentFreelancrService,
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
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(
                this.commentService.create(this.comment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CommentFreelancr>>) {
        result.subscribe((res: HttpResponse<CommentFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CommentFreelancr) {
        this.eventManager.broadcast({ name: 'commentListModification', content: 'OK'});
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
    selector: 'jhi-comment-freelancr-popup',
    template: ''
})
export class CommentFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commentPopupService
                    .open(CommentFreelancrDialogComponent as Component, params['id']);
            } else {
                this.commentPopupService
                    .open(CommentFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
