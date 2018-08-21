/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { ApplicationFreelancrComponent } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr.component';
import { ApplicationFreelancrService } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr.service';
import { ApplicationFreelancr } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr.model';

describe('Component Tests', () => {

    describe('ApplicationFreelancr Management Component', () => {
        let comp: ApplicationFreelancrComponent;
        let fixture: ComponentFixture<ApplicationFreelancrComponent>;
        let service: ApplicationFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ApplicationFreelancrComponent],
                providers: [
                    ApplicationFreelancrService
                ]
            })
            .overrideTemplate(ApplicationFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ApplicationFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.applications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
