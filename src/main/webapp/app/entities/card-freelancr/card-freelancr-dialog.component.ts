import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardFreelancr } from './card-freelancr.model';
import { CardFreelancrPopupService } from './card-freelancr-popup.service';
import { CardFreelancrService } from './card-freelancr.service';
import { User, UserService } from '../../shared';
import { ProjectFreelancr, ProjectFreelancrService } from '../project-freelancr';
import { PositionFreelancr, PositionFreelancrService } from '../position-freelancr';

@Component({
    selector: 'jhi-card-freelancr-dialog',
    templateUrl: './card-freelancr-dialog.component.html'
})
export class CardFreelancrDialogComponent implements OnInit {

    card: CardFreelancr;
    isSaving: boolean;

    users: User[];

    projects: ProjectFreelancr[];

    positions: PositionFreelancr[];
    deadlineDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cardService: CardFreelancrService,
        private userService: UserService,
        private projectService: ProjectFreelancrService,
        private positionService: PositionFreelancrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.projectService.query()
            .subscribe((res: HttpResponse<ProjectFreelancr[]>) => { this.projects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.positionService.query()
            .subscribe((res: HttpResponse<PositionFreelancr[]>) => { this.positions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.card.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardService.update(this.card));
        } else {
            this.subscribeToSaveResponse(
                this.cardService.create(this.card));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardFreelancr>>) {
        result.subscribe((res: HttpResponse<CardFreelancr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardFreelancr) {
        this.eventManager.broadcast({ name: 'cardListModification', content: 'OK'});
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

    trackPositionById(index: number, item: PositionFreelancr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-card-freelancr-popup',
    template: ''
})
export class CardFreelancrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardPopupService
                    .open(CardFreelancrDialogComponent as Component, params['id']);
            } else {
                this.cardPopupService
                    .open(CardFreelancrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
