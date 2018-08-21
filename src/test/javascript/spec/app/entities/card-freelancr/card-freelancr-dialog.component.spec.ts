/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { CardFreelancrDialogComponent } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr-dialog.component';
import { CardFreelancrService } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr.service';
import { CardFreelancr } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { ProjectFreelancrService } from '../../../../../../main/webapp/app/entities/project-freelancr';
import { PositionFreelancrService } from '../../../../../../main/webapp/app/entities/position-freelancr';

describe('Component Tests', () => {

    describe('CardFreelancr Management Dialog Component', () => {
        let comp: CardFreelancrDialogComponent;
        let fixture: ComponentFixture<CardFreelancrDialogComponent>;
        let service: CardFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [CardFreelancrDialogComponent],
                providers: [
                    UserService,
                    ProjectFreelancrService,
                    PositionFreelancrService,
                    CardFreelancrService
                ]
            })
            .overrideTemplate(CardFreelancrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardFreelancrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardFreelancrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardFreelancr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.card = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardFreelancr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.card = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
