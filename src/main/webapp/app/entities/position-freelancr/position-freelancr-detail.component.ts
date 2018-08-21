import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PositionFreelancr } from './position-freelancr.model';
import { PositionFreelancrService } from './position-freelancr.service';

@Component({
    selector: 'jhi-position-freelancr-detail',
    templateUrl: './position-freelancr-detail.component.html'
})
export class PositionFreelancrDetailComponent implements OnInit, OnDestroy {

    position: PositionFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private positionService: PositionFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPositions();
    }

    load(id) {
        this.positionService.find(id)
            .subscribe((positionResponse: HttpResponse<PositionFreelancr>) => {
                this.position = positionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPositions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'positionListModification',
            (response) => this.load(this.position.id)
        );
    }
}
