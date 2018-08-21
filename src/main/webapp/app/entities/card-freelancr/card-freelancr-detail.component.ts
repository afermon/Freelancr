import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CardFreelancr } from './card-freelancr.model';
import { CardFreelancrService } from './card-freelancr.service';

@Component({
    selector: 'jhi-card-freelancr-detail',
    templateUrl: './card-freelancr-detail.component.html'
})
export class CardFreelancrDetailComponent implements OnInit, OnDestroy {

    card: CardFreelancr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardService: CardFreelancrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCards();
    }

    load(id) {
        this.cardService.find(id)
            .subscribe((cardResponse: HttpResponse<CardFreelancr>) => {
                this.card = cardResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardListModification',
            (response) => this.load(this.card.id)
        );
    }
}
