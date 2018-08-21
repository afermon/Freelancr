import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationFreelancr } from './notification-freelancr.model';
import { NotificationFreelancrService } from './notification-freelancr.service';

@Component({
    selector: 'jhi-notification-freelancr-detail',
    templateUrl: './notification-freelancr-detail.component.html'
})
export class NotificationFreelancrDetailComponent implements OnInit, OnDestroy {

    notification: NotificationFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private notificationService: NotificationFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotifications();
    }

    load(id) {
        this.notificationService.find(id)
            .subscribe((notificationResponse: HttpResponse<NotificationFreelancr>) => {
                this.notification = notificationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotifications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notificationListModification',
            (response) => this.load(this.notification.id)
        );
    }
}
