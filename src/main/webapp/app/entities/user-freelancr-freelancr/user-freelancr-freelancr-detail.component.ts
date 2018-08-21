import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserFreelancrFreelancr } from './user-freelancr-freelancr.model';
import { UserFreelancrFreelancrService } from './user-freelancr-freelancr.service';

@Component({
    selector: 'jhi-user-freelancr-freelancr-detail',
    templateUrl: './user-freelancr-freelancr-detail.component.html'
})
export class UserFreelancrFreelancrDetailComponent implements OnInit, OnDestroy {

    userFreelancr: UserFreelancrFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userFreelancrService: UserFreelancrFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserFreelancrs();
    }

    load(id) {
        this.userFreelancrService.find(id)
            .subscribe((userFreelancrResponse: HttpResponse<UserFreelancrFreelancr>) => {
                this.userFreelancr = userFreelancrResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserFreelancrs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userFreelancrListModification',
            (response) => this.load(this.userFreelancr.id)
        );
    }
}
