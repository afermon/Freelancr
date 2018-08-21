import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PositionTypeFreelancr } from './position-type-freelancr.model';
import { PositionTypeFreelancrPopupService } from './position-type-freelancr-popup.service';
import { PositionTypeFreelancrService } from './position-type-freelancr.service';

@Component({
    selector: 'jhi-position-type-freelancr-dialog',
    templateUrl: './position-type-freelancr-dialog.component.html'
})
export class PositionTypeFreelancrDialogComponent implements OnInit {

    positionType: PositionTypeFreelancr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private positionTypeService: PositionTypeFreelancrService,
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
        if (this.positionType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.positionTypeService.update(this.positionType));
        } else {
            this.subscribeToSaveResponse(
                this.positionTypeService.create(this.positionType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PositionTypeFreelancr>>) {
        result.subscribe((res: HttpResponse<PositionTypeFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PositionTypeFreelancr) {
        this.eventManager.broadcast({ name: 'positionTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-position-type-freelancr-popup',
    template: ''
})
export class PositionTypeFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionTypePopupService: PositionTypeFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.positionTypePopupService
                    .open(PositionTypeFreelancrDialogComponent as Component, params['id']);
            } else {
                this.positionTypePopupService
                    .open(PositionTypeFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
