import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserFreelancrFreelancr } from './user-freelancr-freelancr.model';
import { UserFreelancrFreelancrPopupService } from './user-freelancr-freelancr-popup.service';
import { UserFreelancrFreelancrService } from './user-freelancr-freelancr.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-user-freelancr-freelancr-dialog',
    templateUrl: './user-freelancr-freelancr-dialog.component.html'
})
export class UserFreelancrFreelancrDialogComponent implements OnInit {

    userFreelancr: UserFreelancrFreelancr;
    isSaving: boolean;

    users: User[];
    birthDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userFreelancrService: UserFreelancrFreelancrService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userFreelancr.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userFreelancrService.update(this.userFreelancr));
        } else {
            this.subscribeToSaveResponse(
                this.userFreelancrService.create(this.userFreelancr));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserFreelancrFreelancr>>) {
        result.subscribe((res: HttpResponse<UserFreelancrFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserFreelancrFreelancr) {
        this.eventManager.broadcast({ name: 'userFreelancrListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-user-freelancr-freelancr-popup',
    template: ''
})
export class UserFreelancrFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userFreelancrPopupService: UserFreelancrFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userFreelancrPopupService
                    .open(UserFreelancrFreelancrDialogComponent as Component, params['id']);
            } else {
                this.userFreelancrPopupService
                    .open(UserFreelancrFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
