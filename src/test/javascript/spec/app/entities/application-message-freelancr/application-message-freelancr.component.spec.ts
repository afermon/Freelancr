/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { ApplicationMessageFreelancrComponent } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.component';
import { ApplicationMessageFreelancrService } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.service';
import { ApplicationMessageFreelancr } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.model';

describe('Component Tests', () => {

    describe('ApplicationMessageFreelancr Management Component', () => {
        let comp: ApplicationMessageFreelancrComponent;
        let fixture: ComponentFixture<ApplicationMessageFreelancrComponent>;
        let service: ApplicationMessageFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ApplicationMessageFreelancrComponent],
                providers: [
                    ApplicationMessageFreelancrService
                ]
            })
            .overrideTemplate(ApplicationMessageFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationMessageFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationMessageFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ApplicationMessageFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.applicationMessages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
