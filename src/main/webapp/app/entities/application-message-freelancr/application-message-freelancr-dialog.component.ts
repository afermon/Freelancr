import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ApplicationMessageFreelancr } from './application-message-freelancr.model';
import { ApplicationMessageFreelancrPopupService } from './application-message-freelancr-popup.service';
import { ApplicationMessageFreelancrService } from './application-message-freelancr.service';
import { ApplicationFreelancr, ApplicationFreelancrService } from '../application-freelancr';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-application-message-freelancr-dialog',
    templateUrl: './application-message-freelancr-dialog.component.html'
})
export class ApplicationMessageFreelancrDialogComponent implements OnInit {

    applicationMessage: ApplicationMessageFreelancr;
    isSaving: boolean;

    applications: ApplicationFreelancr[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private applicationMessageService: ApplicationMessageFreelancrService,
        private applicationService: ApplicationFreelancrService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.applicationService.query()
            .subscribe((res: HttpResponse<ApplicationFreelancr[]>) => { this.applications = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.applicationMessage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.applicationMessageService.update(this.applicationMessage));
        } else {
            this.subscribeToSaveResponse(
                this.applicationMessageService.create(this.applicationMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ApplicationMessageFreelancr>>) {
        result.subscribe((res: HttpResponse<ApplicationMessageFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ApplicationMessageFreelancr) {
        this.eventManager.broadcast({ name: 'applicationMessageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackApplicationById(index: number, item: ApplicationFreelancr) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-application-message-freelancr-popup',
    template: ''
})
export class ApplicationMessageFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private applicationMessagePopupService: ApplicationMessageFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.applicationMessagePopupService
                    .open(ApplicationMessageFreelancrDialogComponent as Component, params['id']);
            } else {
                this.applicationMessagePopupService
                    .open(ApplicationMessageFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
