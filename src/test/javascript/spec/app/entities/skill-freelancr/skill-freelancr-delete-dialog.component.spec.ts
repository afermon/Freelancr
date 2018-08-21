/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { SkillFreelancrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr-delete-dialog.component';
import { SkillFreelancrService } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr.service';

describe('Component Tests', () => {

    describe('SkillFreelancr Management Delete Component', () => {
        let comp: SkillFreelancrDeleteDialogComponent;
        let fixture: ComponentFixture<SkillFreelancrDeleteDialogComponent>;
        let service: SkillFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SkillFreelancrDeleteDialogComponent],
                providers: [
                    SkillFreelancrService
                ]
            })
            .overrideTemplate(SkillFreelancrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillFreelancrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillFreelancrService);
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
