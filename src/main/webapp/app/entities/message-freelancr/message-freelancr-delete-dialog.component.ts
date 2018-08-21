import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageFreelancr } from './message-freelancr.model';
import { MessageFreelancrPopupService } from './message-freelancr-popup.service';
import { MessageFreelancrService } from './message-freelancr.service';

@Component({
    selector: 'jhi-message-freelancr-delete-dialog',
    templateUrl: './message-freelancr-delete-dialog.component.html'
})
export class MessageFreelancrDeleteDialogComponent {

    message: MessageFreelancr;

    constructor(
        private messageService: MessageFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.messageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'messageListModification',
                content: 'Deleted an message'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-message-freelancr-delete-popup',
    template: ''
})
export class MessageFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messagePopupService: MessageFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.messagePopupService
                .open(MessageFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
