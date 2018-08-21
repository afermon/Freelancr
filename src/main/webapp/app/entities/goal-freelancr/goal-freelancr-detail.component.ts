import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GoalFreelancr } from './goal-freelancr.model';
import { GoalFreelancrService } from './goal-freelancr.service';

@Component({
    selector: 'jhi-goal-freelancr-detail',
    templateUrl: './goal-freelancr-detail.component.html'
})
export class GoalFreelancrDetailComponent implements OnInit, OnDestroy {

    goal: GoalFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private goalService: GoalFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGoals();
    }

    load(id) {
        this.goalService.find(id)
            .subscribe((goalResponse: HttpResponse<GoalFreelancr>) => {
                this.goal = goalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGoals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'goalListModification',
            (response) => this.load(this.goal.id)
        );
    }
}
