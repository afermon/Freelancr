import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApplicationFreelancr } from './application-freelancr.model';
import { ApplicationFreelancrPopupService } from './application-freelancr-popup.service';
import { ApplicationFreelancrService } from './application-freelancr.service';

@Component({
    selector: 'jhi-application-freelancr-delete-dialog',
    templateUrl: './application-freelancr-delete-dialog.component.html'
})
export class ApplicationFreelancrDeleteDialogComponent {

    application: ApplicationFreelancr;

    constructor(
        private applicationService: ApplicationFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'applicationListModification',
                content: 'Deleted an application'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-application-freelancr-delete-popup',
    template: ''
})
export class ApplicationFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private applicationPopupService: ApplicationFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.applicationPopupService
                .open(ApplicationFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
