import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SkillTypeFreelancr } from './skill-type-freelancr.model';
import { SkillTypeFreelancrService } from './skill-type-freelancr.service';

@Component({
    selector: 'jhi-skill-type-freelancr-detail',
    templateUrl: './skill-type-freelancr-detail.component.html'
})
export class SkillTypeFreelancrDetailComponent implements OnInit, OnDestroy {

    skillType: SkillTypeFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private skillTypeService: SkillTypeFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSkillTypes();
    }

    load(id) {
        this.skillTypeService.find(id)
            .subscribe((skillTypeResponse: HttpResponse<SkillTypeFreelancr>) => {
                this.skillType = skillTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSkillTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'skillTypeListModification',
            (response) => this.load(this.skillType.id)
        );
    }
}
