import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PositionFreelancr } from './position-freelancr.model';
import { PositionFreelancrPopupService } from './position-freelancr-popup.service';
import { PositionFreelancrService } from './position-freelancr.service';
import { PositionTypeFreelancr, PositionTypeFreelancrService } from '../position-type-freelancr';
import { SkillTypeFreelancr, SkillTypeFreelancrService } from '../skill-type-freelancr';
import { User, UserService } from '../../shared';
import { ProjectFreelancr, ProjectFreelancrService } from '../project-freelancr';

@Component({
    selector: 'jhi-position-freelancr-dialog',
    templateUrl: './position-freelancr-dialog.component.html'
})
export class PositionFreelancrDialogComponent implements OnInit {

    position: PositionFreelancr;
    isSaving: boolean;

    positiontypes: PositionTypeFreelancr[];

    skilltypes: SkillTypeFreelancr[];

    users: User[];

    projects: ProjectFreelancr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private positionService: PositionFreelancrService,
        private positionTypeService: PositionTypeFreelancrService,
        private skillTypeService: SkillTypeFreelancrService,
        private userService: UserService,
        private projectService: ProjectFreelancrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.positionTypeService.query()
            .subscribe((res: HttpResponse<PositionTypeFreelancr[]>) => { this.positiontypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.skillTypeService.query()
            .subscribe((res: HttpResponse<SkillTypeFreelancr[]>) => { this.skilltypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.position.id !== undefined) {
            this.subscribeToSaveResponse(
                this.positionService.update(this.position));
        } else {
            this.subscribeToSaveResponse(
                this.positionService.create(this.position));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PositionFreelancr>>) {
        result.subscribe((res: HttpResponse<PositionFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PositionFreelancr) {
        this.eventManager.broadcast({ name: 'positionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPositionTypeById(index: number, item: PositionTypeFreelancr) {
        return item.id;
    }

    trackSkillTypeById(index: number, item: SkillTypeFreelancr) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackProjectById(index: number, item: ProjectFreelancr) {
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
    selector: 'jhi-position-freelancr-popup',
    template: ''
})
export class PositionFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionPopupService: PositionFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.positionPopupService
                    .open(PositionFreelancrDialogComponent as Component, params['id']);
            } else {
                this.positionPopupService
                    .open(PositionFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
