import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SkillFreelancr } from './skill-freelancr.model';
import { SkillFreelancrPopupService } from './skill-freelancr-popup.service';
import { SkillFreelancrService } from './skill-freelancr.service';

@Component({
    selector: 'jhi-skill-freelancr-delete-dialog',
    templateUrl: './skill-freelancr-delete-dialog.component.html'
})
export class SkillFreelancrDeleteDialogComponent {

    skill: SkillFreelancr;

    constructor(
        private skillService: SkillFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.skillService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'skillListModification',
                content: 'Deleted an skill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-skill-freelancr-delete-popup',
    template: ''
})
export class SkillFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillPopupService: SkillFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.skillPopupService
                .open(SkillFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
