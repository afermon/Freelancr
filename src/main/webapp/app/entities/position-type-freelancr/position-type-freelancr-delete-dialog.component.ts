import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PositionTypeFreelancr } from './position-type-freelancr.model';
import { PositionTypeFreelancrPopupService } from './position-type-freelancr-popup.service';
import { PositionTypeFreelancrService } from './position-type-freelancr.service';

@Component({
    selector: 'jhi-position-type-freelancr-delete-dialog',
    templateUrl: './position-type-freelancr-delete-dialog.component.html'
})
export class PositionTypeFreelancrDeleteDialogComponent {

    positionType: PositionTypeFreelancr;

    constructor(
        private positionTypeService: PositionTypeFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.positionTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'positionTypeListModification',
                content: 'Deleted an positionType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-position-type-freelancr-delete-popup',
    template: ''
})
export class PositionTypeFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionTypePopupService: PositionTypeFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.positionTypePopupService
                .open(PositionTypeFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
