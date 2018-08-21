import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SkillTypeFreelancr } from './skill-type-freelancr.model';
import { SkillTypeFreelancrPopupService } from './skill-type-freelancr-popup.service';
import { SkillTypeFreelancrService } from './skill-type-freelancr.service';

@Component({
    selector: 'jhi-skill-type-freelancr-dialog',
    templateUrl: './skill-type-freelancr-dialog.component.html'
})
export class SkillTypeFreelancrDialogComponent implements OnInit {

    skillType: SkillTypeFreelancr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private skillTypeService: SkillTypeFreelancrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.skillType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skillTypeService.update(this.skillType));
        } else {
            this.subscribeToSaveResponse(
                this.skillTypeService.create(this.skillType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SkillTypeFreelancr>>) {
        result.subscribe((res: HttpResponse<SkillTypeFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SkillTypeFreelancr) {
        this.eventManager.broadcast({ name: 'skillTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-skill-type-freelancr-popup',
    template: ''
})
export class SkillTypeFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillTypePopupService: SkillTypeFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skillTypePopupService
                    .open(SkillTypeFreelancrDialogComponent as Component, params['id']);
            } else {
                this.skillTypePopupService
                    .open(SkillTypeFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
