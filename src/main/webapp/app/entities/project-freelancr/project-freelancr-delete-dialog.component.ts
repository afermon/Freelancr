import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectFreelancr } from './project-freelancr.model';
import { ProjectFreelancrPopupService } from './project-freelancr-popup.service';
import { ProjectFreelancrService } from './project-freelancr.service';

@Component({
    selector: 'jhi-project-freelancr-delete-dialog',
    templateUrl: './project-freelancr-delete-dialog.component.html'
})
export class ProjectFreelancrDeleteDialogComponent {

    project: ProjectFreelancr;

    constructor(
        private projectService: ProjectFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projectListModification',
                content: 'Deleted an project'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-freelancr-delete-popup',
    template: ''
})
export class ProjectFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectPopupService: ProjectFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.projectPopupService
                .open(ProjectFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
