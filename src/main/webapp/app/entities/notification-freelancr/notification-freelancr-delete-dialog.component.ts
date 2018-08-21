import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationFreelancr } from './notification-freelancr.model';
import { NotificationFreelancrPopupService } from './notification-freelancr-popup.service';
import { NotificationFreelancrService } from './notification-freelancr.service';

@Component({
    selector: 'jhi-notification-freelancr-delete-dialog',
    templateUrl: './notification-freelancr-delete-dialog.component.html'
})
export class NotificationFreelancrDeleteDialogComponent {

    notification: NotificationFreelancr;

    constructor(
        private notificationService: NotificationFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notificationListModification',
                content: 'Deleted an notification'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notification-freelancr-delete-popup',
    template: ''
})
export class NotificationFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificationPopupService: NotificationFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notificationPopupService
                .open(NotificationFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
