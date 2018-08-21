import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApplicationMessageFreelancr } from './application-message-freelancr.model';
import { ApplicationMessageFreelancrPopupService } from './application-message-freelancr-popup.service';
import { ApplicationMessageFreelancrService } from './application-message-freelancr.service';

@Component({
    selector: 'jhi-application-message-freelancr-delete-dialog',
    templateUrl: './application-message-freelancr-delete-dialog.component.html'
})
export class ApplicationMessageFreelancrDeleteDialogComponent {

    applicationMessage: ApplicationMessageFreelancr;

    constructor(
        private applicationMessageService: ApplicationMessageFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicationMessageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'applicationMessageListModification',
                content: 'Deleted an applicationMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-application-message-freelancr-delete-popup',
    template: ''
})
export class ApplicationMessageFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private applicationMessagePopupService: ApplicationMessageFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.applicationMessagePopupService
                .open(ApplicationMessageFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
