/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { CommentFreelancrComponent } from '../../../../../../main/webapp/app/entities/comment-freelancr/comment-freelancr.component';
import { CommentFreelancrService } from '../../../../../../main/webapp/app/entities/comment-freelancr/comment-freelancr.service';
import { CommentFreelancr } from '../../../../../../main/webapp/app/entities/comment-freelancr/comment-freelancr.model';

describe('Component Tests', () => {

    describe('CommentFreelancr Management Component', () => {
        let comp: CommentFreelancrComponent;
        let fixture: ComponentFixture<CommentFreelancrComponent>;
        let service: CommentFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [CommentFreelancrComponent],
                providers: [
                    CommentFreelancrService
                ]
            })
            .overrideTemplate(CommentFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CommentFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
