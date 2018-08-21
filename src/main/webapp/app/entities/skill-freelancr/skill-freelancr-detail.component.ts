import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SkillFreelancr } from './skill-freelancr.model';
import { SkillFreelancrService } from './skill-freelancr.service';

@Component({
    selector: 'jhi-skill-freelancr-detail',
    templateUrl: './skill-freelancr-detail.component.html'
})
export class SkillFreelancrDetailComponent implements OnInit, OnDestroy {

    skill: SkillFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private skillService: SkillFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSkills();
    }

    load(id) {
        this.skillService.find(id)
            .subscribe((skillResponse: HttpResponse<SkillFreelancr>) => {
                this.skill = skillResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'skillListModification',
            (response) => this.load(this.skill.id)
        );
    }
}
