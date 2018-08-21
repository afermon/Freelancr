/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { FeedbackFreelancrComponent } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr.component';
import { FeedbackFreelancrService } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr.service';
import { FeedbackFreelancr } from '../../../../../../main/webapp/app/entities/feedback-freelancr/feedback-freelancr.model';

describe('Component Tests', () => {

    describe('FeedbackFreelancr Management Component', () => {
        let comp: FeedbackFreelancrComponent;
        let fixture: ComponentFixture<FeedbackFreelancrComponent>;
        let service: FeedbackFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [FeedbackFreelancrComponent],
                providers: [
                    FeedbackFreelancrService
                ]
            })
            .overrideTemplate(FeedbackFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FeedbackFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeedbackFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FeedbackFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.feedbacks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
