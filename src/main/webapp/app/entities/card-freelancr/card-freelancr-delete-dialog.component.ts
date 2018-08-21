import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardFreelancr } from './card-freelancr.model';
import { CardFreelancrPopupService } from './card-freelancr-popup.service';
import { CardFreelancrService } from './card-freelancr.service';

@Component({
    selector: 'jhi-card-freelancr-delete-dialog',
    templateUrl: './card-freelancr-delete-dialog.component.html'
})
export class CardFreelancrDeleteDialogComponent {

    card: CardFreelancr;

    constructor(
        private cardService: CardFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cardListModification',
                content: 'Deleted an card'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-freelancr-delete-popup',
    template: ''
})
export class CardFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cardPopupService
                .open(CardFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
