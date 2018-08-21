import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentFreelancr } from './comment-freelancr.model';
import { CommentFreelancrPopupService } from './comment-freelancr-popup.service';
import { CommentFreelancrService } from './comment-freelancr.service';

@Component({
    selector: 'jhi-comment-freelancr-delete-dialog',
    templateUrl: './comment-freelancr-delete-dialog.component.html'
})
export class CommentFreelancrDeleteDialogComponent {

    comment: CommentFreelancr;

    constructor(
        private commentService: CommentFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentListModification',
                content: 'Deleted an comment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comment-freelancr-delete-popup',
    template: ''
})
export class CommentFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentPopupService
                .open(CommentFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
