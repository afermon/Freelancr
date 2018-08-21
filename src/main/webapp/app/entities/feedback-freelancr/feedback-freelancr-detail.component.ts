import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FeedbackFreelancr } from './feedback-freelancr.model';
import { FeedbackFreelancrService } from './feedback-freelancr.service';

@Component({
    selector: 'jhi-feedback-freelancr-detail',
    templateUrl: './feedback-freelancr-detail.component.html'
})
export class FeedbackFreelancrDetailComponent implements OnInit, OnDestroy {

    feedback: FeedbackFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private feedbackService: FeedbackFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFeedbacks();
    }

    load(id) {
        this.feedbackService.find(id)
            .subscribe((feedbackResponse: HttpResponse<FeedbackFreelancr>) => {
                this.feedback = feedbackResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFeedbacks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'feedbackListModification',
            (response) => this.load(this.feedback.id)
        );
    }
}
