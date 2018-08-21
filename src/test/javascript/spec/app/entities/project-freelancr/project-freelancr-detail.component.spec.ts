/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { ProjectFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/project-freelancr/project-freelancr-detail.component';
import { ProjectFreelancrService } from '../../../../../../main/webapp/app/entities/project-freelancr/project-freelancr.service';
import { ProjectFreelancr } from '../../../../../../main/webapp/app/entities/project-freelancr/project-freelancr.model';

describe('Component Tests', () => {

    describe('ProjectFreelancr Management Detail Component', () => {
        let comp: ProjectFreelancrDetailComponent;
        let fixture: ComponentFixture<ProjectFreelancrDetailComponent>;
        let service: ProjectFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ProjectFreelancrDetailComponent],
                providers: [
                    ProjectFreelancrService
                ]
            })
            .overrideTemplate(ProjectFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProjectFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.project).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
