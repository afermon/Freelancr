import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GoalFreelancr } from './goal-freelancr.model';
import { GoalFreelancrPopupService } from './goal-freelancr-popup.service';
import { GoalFreelancrService } from './goal-freelancr.service';
import { ProjectFreelancr, ProjectFreelancrService } from '../project-freelancr';

@Component({
    selector: 'jhi-goal-freelancr-dialog',
    templateUrl: './goal-freelancr-dialog.component.html'
})
export class GoalFreelancrDialogComponent implements OnInit {

    goal: GoalFreelancr;
    isSaving: boolean;

    projects: ProjectFreelancr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private goalService: GoalFreelancrService,
        private projectService: ProjectFreelancrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projectService.query()
            .subscribe((res: HttpResponse<ProjectFreelancr[]>) => { this.projects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.goal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.goalService.update(this.goal));
        } else {
            this.subscribeToSaveResponse(
                this.goalService.create(this.goal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GoalFreelancr>>) {
        result.subscribe((res: HttpResponse<GoalFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GoalFreelancr) {
        this.eventManager.broadcast({ name: 'goalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjectById(index: number, item: ProjectFreelancr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-goal-freelancr-popup',
    template: ''
})
export class GoalFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private goalPopupService: GoalFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.goalPopupService
                    .open(GoalFreelancrDialogComponent as Component, params['id']);
            } else {
                this.goalPopupService
                    .open(GoalFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
