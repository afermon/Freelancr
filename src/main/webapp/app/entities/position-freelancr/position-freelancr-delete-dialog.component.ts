import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PositionFreelancr } from './position-freelancr.model';
import { PositionFreelancrPopupService } from './position-freelancr-popup.service';
import { PositionFreelancrService } from './position-freelancr.service';

@Component({
    selector: 'jhi-position-freelancr-delete-dialog',
    templateUrl: './position-freelancr-delete-dialog.component.html'
})
export class PositionFreelancrDeleteDialogComponent {

    position: PositionFreelancr;

    constructor(
        private positionService: PositionFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.positionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'positionListModification',
                content: 'Deleted an position'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-position-freelancr-delete-popup',
    template: ''
})
export class PositionFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionPopupService: PositionFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.positionPopupService
                .open(PositionFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
