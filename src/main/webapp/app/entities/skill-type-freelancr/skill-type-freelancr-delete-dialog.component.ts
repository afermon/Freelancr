import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SkillTypeFreelancr } from './skill-type-freelancr.model';
import { SkillTypeFreelancrPopupService } from './skill-type-freelancr-popup.service';
import { SkillTypeFreelancrService } from './skill-type-freelancr.service';

@Component({
    selector: 'jhi-skill-type-freelancr-delete-dialog',
    templateUrl: './skill-type-freelancr-delete-dialog.component.html'
})
export class SkillTypeFreelancrDeleteDialogComponent {

    skillType: SkillTypeFreelancr;

    constructor(
        private skillTypeService: SkillTypeFreelancrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.skillTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'skillTypeListModification',
                content: 'Deleted an skillType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-skill-type-freelancr-delete-popup',
    template: ''
})
export class SkillTypeFreelancrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillTypePopupService: SkillTypeFreelancrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.skillTypePopupService
                .open(SkillTypeFreelancrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
