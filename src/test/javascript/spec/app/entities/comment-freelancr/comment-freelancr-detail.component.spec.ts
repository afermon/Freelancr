/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { CommentFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/comment-freelancr/comment-freelancr-detail.component';
import { CommentFreelancrService } from '../../../../../../main/webapp/app/entities/comment-freelancr/comment-freelancr.service';
import { CommentFreelancr } from '../../../../../../main/webapp/app/entities/comment-freelancr/comment-freelancr.model';

describe('Component Tests', () => {

    describe('CommentFreelancr Management Detail Component', () => {
        let comp: CommentFreelancrDetailComponent;
        let fixture: ComponentFixture<CommentFreelancrDetailComponent>;
        let service: CommentFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [CommentFreelancrDetailComponent],
                providers: [
                    CommentFreelancrService
                ]
            })
            .overrideTemplate(CommentFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CommentFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
