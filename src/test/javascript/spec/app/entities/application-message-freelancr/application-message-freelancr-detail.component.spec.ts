/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { ApplicationMessageFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr-detail.component';
import { ApplicationMessageFreelancrService } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.service';
import { ApplicationMessageFreelancr } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.model';

describe('Component Tests', () => {

    describe('ApplicationMessageFreelancr Management Detail Component', () => {
        let comp: ApplicationMessageFreelancrDetailComponent;
        let fixture: ComponentFixture<ApplicationMessageFreelancrDetailComponent>;
        let service: ApplicationMessageFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ApplicationMessageFreelancrDetailComponent],
                providers: [
                    ApplicationMessageFreelancrService
                ]
            })
            .overrideTemplate(ApplicationMessageFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationMessageFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationMessageFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ApplicationMessageFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.applicationMessage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
