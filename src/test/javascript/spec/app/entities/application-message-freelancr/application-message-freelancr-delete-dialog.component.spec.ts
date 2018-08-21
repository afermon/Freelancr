/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { ApplicationMessageFreelancrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr-delete-dialog.component';
import { ApplicationMessageFreelancrService } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.service';

describe('Component Tests', () => {

    describe('ApplicationMessageFreelancr Management Delete Component', () => {
        let comp: ApplicationMessageFreelancrDeleteDialogComponent;
        let fixture: ComponentFixture<ApplicationMessageFreelancrDeleteDialogComponent>;
        let service: ApplicationMessageFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ApplicationMessageFreelancrDeleteDialogComponent],
                providers: [
                    ApplicationMessageFreelancrService
                ]
            })
            .overrideTemplate(ApplicationMessageFreelancrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationMessageFreelancrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationMessageFreelancrService);
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
