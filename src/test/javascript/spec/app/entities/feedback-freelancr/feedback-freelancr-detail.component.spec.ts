/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { FeedbackFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr-detail.component';
import { FeedbackFreelancrService } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr.service';
import { FeedbackFreelancr } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr.model';

describe('Component Tests', () => {

    describe('FeedbackFreelancr Management Detail Component', () => {
        let comp: FeedbackFreelancrDetailComponent;
        let fixture: ComponentFixture<FeedbackFreelancrDetailComponent>;
        let service: FeedbackFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [FeedbackFreelancrDetailComponent],
                providers: [
                    FeedbackFreelancrService
                ]
            })
            .overrideTemplate(FeedbackFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FeedbackFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeedbackFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FeedbackFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.feedback).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
