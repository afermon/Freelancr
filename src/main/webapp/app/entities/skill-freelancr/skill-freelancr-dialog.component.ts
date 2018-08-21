import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SkillFreelancr } from './skill-freelancr.model';
import { SkillFreelancrPopupService } from './skill-freelancr-popup.service';
import { SkillFreelancrService } from './skill-freelancr.service';
import { SkillTypeFreelancr, SkillTypeFreelancrService } from '../skill-type-freelancr';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-skill-freelancr-dialog',
    templateUrl: './skill-freelancr-dialog.component.html'
})
export class SkillFreelancrDialogComponent implements OnInit {

    skill: SkillFreelancr;
    isSaving: boolean;

    skilltypes: SkillTypeFreelancr[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private skillService: SkillFreelancrService,
        private skillTypeService: SkillTypeFreelancrService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.skillTypeService.query()
            .subscribe((res: HttpResponse<SkillTypeFreelancr[]>) => { this.skilltypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.skill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skillService.update(this.skill));
        } else {
            this.subscribeToSaveResponse(
                this.skillService.create(this.skill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SkillFreelancr>>) {
        result.subscribe((res: HttpResponse<SkillFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SkillFreelancr) {
        this.eventManager.broadcast({ name: 'skillListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSkillTypeById(index: number, item: SkillTypeFreelancr) {
        return item.id;
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
    selector: 'jhi-skill-freelancr-popup',
    template: ''
})
export class SkillFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillPopupService: SkillFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skillPopupService
                    .open(SkillFreelancrDialogComponent as Component, params['id']);
            } else {
                this.skillPopupService
                    .open(SkillFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
