/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { GoalFreelancrComponent } from '../../../../../../main/webapp/app/entities/goal-freelancr/goal-freelancr.component';
import { GoalFreelancrService } from '../../../../../../main/webapp/app/entities/goal-freelancr/goal-freelancr.service';
import { GoalFreelancr } from '../../../../../../main/webapp/app/entities/goal-freelancr/goal-freelancr.model';

describe('Component Tests', () => {

    describe('GoalFreelancr Management Component', () => {
        let comp: GoalFreelancrComponent;
        let fixture: ComponentFixture<GoalFreelancrComponent>;
        let service: GoalFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [GoalFreelancrComponent],
                providers: [
                    GoalFreelancrService
                ]
            })
            .overrideTemplate(GoalFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GoalFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GoalFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GoalFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.goals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
