import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FeedbackFreelancr } from './feedback-freelancr.model';
import { FeedbackFreelancrPopupService } from './feedback-freelancr-popup.service';
import { FeedbackFreelancrService } from './feedback-freelancr.service';

@Component({
    selector: 'jhi-feedback-freelancr-delete-dialog',
    templateUrl: './feedback-freelancr-delete-dialog.component.html'
})
export class FeedbackFreelancrDeleteDialogComponent {

    feedback: FeedbackFreelancr;

    constructor(
        private feedbackService: FeedbackFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.feedbackService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'feedbackListModification',
                content: 'Deleted an feedback'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-feedback-freelancr-delete-popup',
    template: ''
})
export class FeedbackFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private feedbackPopupService: FeedbackFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.feedbackPopupService
                .open(FeedbackFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
