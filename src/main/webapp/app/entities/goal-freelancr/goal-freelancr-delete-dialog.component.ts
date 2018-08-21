import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GoalFreelancr } from './goal-freelancr.model';
import { GoalFreelancrPopupService } from './goal-freelancr-popup.service';
import { GoalFreelancrService } from './goal-freelancr.service';

@Component({
    selector: 'jhi-goal-freelancr-delete-dialog',
    templateUrl: './goal-freelancr-delete-dialog.component.html'
})
export class GoalFreelancrDeleteDialogComponent {

    goal: GoalFreelancr;

    constructor(
        private goalService: GoalFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.goalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'goalListModification',
                content: 'Deleted an goal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-goal-freelancr-delete-popup',
    template: ''
})
export class GoalFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private goalPopupService: GoalFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.goalPopupService
                .open(GoalFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
