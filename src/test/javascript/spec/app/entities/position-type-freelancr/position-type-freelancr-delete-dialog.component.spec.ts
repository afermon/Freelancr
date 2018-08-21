/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { PositionTypeFreelancrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr-delete-dialog.component';
import { PositionTypeFreelancrService } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr.service';

describe('Component Tests', () => {

    describe('PositionTypeFreelancr Management Delete Component', () => {
        let comp: PositionTypeFreelancrDeleteDialogComponent;
        let fixture: ComponentFixture<PositionTypeFreelancrDeleteDialogComponent>;
        let service: PositionTypeFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [PositionTypeFreelancrDeleteDialogComponent],
                providers: [
                    PositionTypeFreelancrService
                ]
            })
            .overrideTemplate(PositionTypeFreelancrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionTypeFreelancrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionTypeFreelancrService);
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
