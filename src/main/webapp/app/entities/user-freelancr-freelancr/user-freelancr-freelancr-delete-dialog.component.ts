import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserFreelancrFreelancr } from './user-freelancr-freelancr.model';
import { UserFreelancrFreelancrPopupService } from './user-freelancr-freelancr-popup.service';
import { UserFreelancrFreelancrService } from './user-freelancr-freelancr.service';

@Component({
    selector: 'jhi-user-freelancr-freelancr-delete-dialog',
    templateUrl: './user-freelancr-freelancr-delete-dialog.component.html'
})
export class UserFreelancrFreelancrDeleteDialogComponent {

    userFreelancr: UserFreelancrFreelancr;

    constructor(
        private userFreelancrService: UserFreelancrFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userFreelancrService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userFreelancrListModification',
                content: 'Deleted an userFreelancr'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-freelancr-freelancr-delete-popup',
    template: ''
})
export class UserFreelancrFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userFreelancrPopupService: UserFreelancrFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userFreelancrPopupService
                .open(UserFreelancrFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
