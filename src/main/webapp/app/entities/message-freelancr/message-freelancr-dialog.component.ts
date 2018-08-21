import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MessageFreelancr } from './message-freelancr.model';
import { MessageFreelancrPopupService } from './message-freelancr-popup.service';
import { MessageFreelancrService } from './message-freelancr.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-message-freelancr-dialog',
    templateUrl: './message-freelancr-dialog.component.html'
})
export class MessageFreelancrDialogComponent implements OnInit {

    message: MessageFreelancr;
    isSaving: boolean;

    replies: MessageFreelancr[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private messageService: MessageFreelancrService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.messageService
            .query({filter: 'message-is-null'})
            .subscribe((res: HttpResponse<MessageFreelancr[]>) => {
                if (!this.message.replyId) {
                    this.replies = res.body;
                } else {
                    this.messageService
                        .find(this.message.replyId)
                        .subscribe((subRes: HttpResponse<MessageFreelancr>) => {
                            this.replies = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.message.id !== undefined) {
            this.subscribeToSaveResponse(
                this.messageService.update(this.message));
        } else {
            this.subscribeToSaveResponse(
                this.messageService.create(this.message));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MessageFreelancr>>) {
        result.subscribe((res: HttpResponse<MessageFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MessageFreelancr) {
        this.eventManager.broadcast({ name: 'messageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMessageById(index: number, item: MessageFreelancr) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-message-freelancr-popup',
    template: ''
})
export class MessageFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messagePopupService: MessageFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.messagePopupService
                    .open(MessageFreelancrDialogComponent as Component, params['id']);
            } else {
                this.messagePopupService
                    .open(MessageFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
