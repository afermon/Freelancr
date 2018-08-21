/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { SubscriptionTierFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr-detail.component';
import { SubscriptionTierFreelancrService } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.service';
import { SubscriptionTierFreelancr } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.model';

describe('Component Tests', () => {

    describe('SubscriptionTierFreelancr Management Detail Component', () => {
        let comp: SubscriptionTierFreelancrDetailComponent;
        let fixture: ComponentFixture<SubscriptionTierFreelancrDetailComponent>;
        let service: SubscriptionTierFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SubscriptionTierFreelancrDetailComponent],
                providers: [
                    SubscriptionTierFreelancrService
                ]
            })
            .overrideTemplate(SubscriptionTierFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionTierFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionTierFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SubscriptionTierFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subscriptionTier).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
