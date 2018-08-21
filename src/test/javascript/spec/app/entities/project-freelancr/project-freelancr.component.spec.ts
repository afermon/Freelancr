/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { ProjectFreelancrComponent } from '../../../../../../main/webapp/app/entities/project-freelancr/project-freelancr.component';
import { ProjectFreelancrService } from '../../../../../../main/webapp/app/entities/project-freelancr/project-freelancr.service';
import { ProjectFreelancr } from '../../../../../../main/webapp/app/entities/project-freelancr/project-freelancr.model';

describe('Component Tests', () => {

    describe('ProjectFreelancr Management Component', () => {
        let comp: ProjectFreelancrComponent;
        let fixture: ComponentFixture<ProjectFreelancrComponent>;
        let service: ProjectFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ProjectFreelancrComponent],
                providers: [
                    ProjectFreelancrService
                ]
            })
            .overrideTemplate(ProjectFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProjectFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.projects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
