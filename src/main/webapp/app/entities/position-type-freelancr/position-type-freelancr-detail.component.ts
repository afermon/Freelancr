import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PositionTypeFreelancr } from './position-type-freelancr.model';
import { PositionTypeFreelancrService } from './position-type-freelancr.service';

@Component({
    selector: 'jhi-position-type-freelancr-detail',
    templateUrl: './position-type-freelancr-detail.component.html'
})
export class PositionTypeFreelancrDetailComponent implements OnInit, OnDestroy {

    positionType: PositionTypeFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private positionTypeService: PositionTypeFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPositionTypes();
    }

    load(id) {
        this.positionTypeService.find(id)
            .subscribe((positionTypeResponse: HttpResponse<PositionTypeFreelancr>) => {
                this.positionType = positionTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPositionTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'positionTypeListModification',
            (response) => this.load(this.positionType.id)
        );
    }
}
