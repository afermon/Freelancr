/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { UserFreelancrFreelancrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr-delete-dialog.component';
import { UserFreelancrFreelancrService } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr.service';

describe('Component Tests', () => {

    describe('UserFreelancrFreelancr Management Delete Component', () => {
        let comp: UserFreelancrFreelancrDeleteDialogComponent;
        let fixture: ComponentFixture<UserFreelancrFreelancrDeleteDialogComponent>;
        let service: UserFreelancrFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [UserFreelancrFreelancrDeleteDialogComponent],
                providers: [
                    UserFreelancrFreelancrService
                ]
            })
            .overrideTemplate(UserFreelancrFreelancrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFreelancrFreelancrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFreelancrFreelancrService);
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
