import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ApplicationMessageFreelancr } from './application-message-freelancr.model';
import { ApplicationMessageFreelancrService } from './application-message-freelancr.service';

@Component({
    selector: 'jhi-application-message-freelancr-detail',
    templateUrl: './application-message-freelancr-detail.component.html'
})
export class ApplicationMessageFreelancrDetailComponent implements OnInit, OnDestroy {

    applicationMessage: ApplicationMessageFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private applicationMessageService: ApplicationMessageFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInApplicationMessages();
    }

    load(id) {
        this.applicationMessageService.find(id)
            .subscribe((applicationMessageResponse: HttpResponse<ApplicationMessageFreelancr>) => {
                this.applicationMessage = applicationMessageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInApplicationMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'applicationMessageListModification',
            (response) => this.load(this.applicationMessage.id)
        );
    }
}
