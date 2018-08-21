import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ApplicationFreelancr } from './application-freelancr.model';
import { ApplicationFreelancrPopupService } from './application-freelancr-popup.service';
import { ApplicationFreelancrService } from './application-freelancr.service';
import { User, UserService } from '../../shared';
import { PositionFreelancr, PositionFreelancrService } from '../position-freelancr';

@Component({
    selector: 'jhi-application-freelancr-dialog',
    templateUrl: './application-freelancr-dialog.component.html'
})
export class ApplicationFreelancrDialogComponent implements OnInit {

    application: ApplicationFreelancr;
    isSaving: boolean;

    users: User[];

    positions: PositionFreelancr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private applicationService: ApplicationFreelancrService,
        private userService: UserService,
        private positionService: PositionFreelancrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.positionService.query()
            .subscribe((res: HttpResponse<PositionFreelancr[]>) => { this.positions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.application.id !== undefined) {
            this.subscribeToSaveResponse(
                this.applicationService.update(this.application));
        } else {
            this.subscribeToSaveResponse(
                this.applicationService.create(this.application));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ApplicationFreelancr>>) {
        result.subscribe((res: HttpResponse<ApplicationFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ApplicationFreelancr) {
        this.eventManager.broadcast({ name: 'applicationListModification', content: 'OK'});
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

    trackPositionById(index: number, item: PositionFreelancr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-application-freelancr-popup',
    template: ''
})
export class ApplicationFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private applicationPopupService: ApplicationFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.applicationPopupService
                    .open(ApplicationFreelancrDialogComponent as Component, params['id']);
            } else {
                this.applicationPopupService
                    .open(ApplicationFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
