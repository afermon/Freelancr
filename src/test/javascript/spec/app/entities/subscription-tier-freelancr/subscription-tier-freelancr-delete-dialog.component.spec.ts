/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { SubscriptionTierFreelancrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr-delete-dialog.component';
import { SubscriptionTierFreelancrService } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.service';

describe('Component Tests', () => {

    describe('SubscriptionTierFreelancr Management Delete Component', () => {
        let comp: SubscriptionTierFreelancrDeleteDialogComponent;
        let fixture: ComponentFixture<SubscriptionTierFreelancrDeleteDialogComponent>;
        let service: SubscriptionTierFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SubscriptionTierFreelancrDeleteDialogComponent],
                providers: [
                    SubscriptionTierFreelancrService
                ]
            })
            .overrideTemplate(SubscriptionTierFreelancrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionTierFreelancrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionTierFreelancrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
