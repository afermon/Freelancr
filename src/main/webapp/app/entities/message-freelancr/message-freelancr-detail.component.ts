import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MessageFreelancr } from './message-freelancr.model';
import { MessageFreelancrService } from './message-freelancr.service';

@Component({
    selector: 'jhi-message-freelancr-detail',
    templateUrl: './message-freelancr-detail.component.html'
})
export class MessageFreelancrDetailComponent implements OnInit, OnDestroy {
    message: MessageFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMessages();
    }

    load(id) {
        this.messageService.find(id)
            .subscribe((messageResponse: HttpResponse<MessageFreelancr>) => {
                this.message = messageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'messageListModification',
            (response) => this.load(this.message.id)
        );
    }
}
