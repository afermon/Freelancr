/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { ApplicationFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr-detail.component';
import { ApplicationFreelancrService } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr.service';
import { ApplicationFreelancr } from '../../../../../../main/webapp/app/entities/application-freelancr/application-freelancr.model';

describe('Component Tests', () => {

    describe('ApplicationFreelancr Management Detail Component', () => {
        let comp: ApplicationFreelancrDetailComponent;
        let fixture: ComponentFixture<ApplicationFreelancrDetailComponent>;
        let service: ApplicationFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ApplicationFreelancrDetailComponent],
                providers: [
                    ApplicationFreelancrService
                ]
            })
            .overrideTemplate(ApplicationFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ApplicationFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.application).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
