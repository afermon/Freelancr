/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { SubscriptionTierFreelancrComponent } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.component';
import { SubscriptionTierFreelancrService } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.service';
import { SubscriptionTierFreelancr } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.model';

describe('Component Tests', () => {

    describe('SubscriptionTierFreelancr Management Component', () => {
        let comp: SubscriptionTierFreelancrComponent;
        let fixture: ComponentFixture<SubscriptionTierFreelancrComponent>;
        let service: SubscriptionTierFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SubscriptionTierFreelancrComponent],
                providers: [
                    SubscriptionTierFreelancrService
                ]
            })
            .overrideTemplate(SubscriptionTierFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionTierFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionTierFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubscriptionTierFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subscriptionTiers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
