/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { GoalFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/goal-freelancr/goal-freelancr-detail.component';
import { GoalFreelancrService } from '../../../../../../main/webapp/app/entities/goal-freelancr/goal-freelancr.service';
import { GoalFreelancr } from '../../../../../../main/webapp/app/entities/goal-freelancr/goal-freelancr.model';

describe('Component Tests', () => {

    describe('GoalFreelancr Management Detail Component', () => {
        let comp: GoalFreelancrDetailComponent;
        let fixture: ComponentFixture<GoalFreelancrDetailComponent>;
        let service: GoalFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [GoalFreelancrDetailComponent],
                providers: [
                    GoalFreelancrService
                ]
            })
            .overrideTemplate(GoalFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GoalFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GoalFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GoalFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.goal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
