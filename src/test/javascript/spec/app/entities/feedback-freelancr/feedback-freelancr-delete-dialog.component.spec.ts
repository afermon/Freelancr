/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { FeedbackFreelancrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr-delete-dialog.component';
import { FeedbackFreelancrService } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr.service';

describe('Component Tests', () => {

    describe('FeedbackFreelancr Management Delete Component', () => {
        let comp: FeedbackFreelancrDeleteDialogComponent;
        let fixture: ComponentFixture<FeedbackFreelancrDeleteDialogComponent>;
        let service: FeedbackFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [FeedbackFreelancrDeleteDialogComponent],
                providers: [
                    FeedbackFreelancrService
                ]
            })
            .overrideTemplate(FeedbackFreelancrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FeedbackFreelancrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeedbackFreelancrService);
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
