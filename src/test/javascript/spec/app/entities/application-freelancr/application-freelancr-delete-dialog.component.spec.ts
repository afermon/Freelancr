/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { ApplicationFreelancrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr-delete-dialog.component';
import { ApplicationFreelancrService } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr.service';

describe('Component Tests', () => {

    describe('ApplicationFreelancr Management Delete Component', () => {
        let comp: ApplicationFreelancrDeleteDialogComponent;
        let fixture: ComponentFixture<ApplicationFreelancrDeleteDialogComponent>;
        let service: ApplicationFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ApplicationFreelancrDeleteDialogComponent],
                providers: [
                    ApplicationFreelancrService
                ]
            })
            .overrideTemplate(ApplicationFreelancrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationFreelancrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationFreelancrService);
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
