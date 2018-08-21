/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { PositionFreelancrDialogComponent } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr-dialog.component';
import { PositionFreelancrService } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr.service';
import { PositionFreelancr } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { PositionTypeFreelancrService } from '../../../../../../main/webapp/app/entities/position-type-freelancr';
import { SkillTypeFreelancrService } from '../../../../../../main/webapp/app/entities/skill-type-freelancr';
import { ProjectFreelancrService } from '../../../../../../main/webapp/app/entities/project-freelancr';

describe('Component Tests', () => {

    describe('PositionFreelancr Management Dialog Component', () => {
        let comp: PositionFreelancrDialogComponent;
        let fixture: ComponentFixture<PositionFreelancrDialogComponent>;
        let service: PositionFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [PositionFreelancrDialogComponent],
                providers: [
                    UserService,
                    PositionTypeFreelancrService,
                    SkillTypeFreelancrService,
                    ProjectFreelancrService,
                    PositionFreelancrService
                ]
            })
            .overrideTemplate(PositionFreelancrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionFreelancrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionFreelancrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PositionFreelancr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.position = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'positionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PositionFreelancr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.position = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'positionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
