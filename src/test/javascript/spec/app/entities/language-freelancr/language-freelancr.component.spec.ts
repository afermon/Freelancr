/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { LanguageFreelancrComponent } from '../../../../../../main/webapp/app/entities/language-freelancr/language-freelancr.component';
import { LanguageFreelancrService } from '../../../../../../main/webapp/app/entities/language-freelancr/language-freelancr.service';
import { LanguageFreelancr } from '../../../../../../main/webapp/app/entities/language-freelancr/language-freelancr.model';

describe('Component Tests', () => {

    describe('LanguageFreelancr Management Component', () => {
        let comp: LanguageFreelancrComponent;
        let fixture: ComponentFixture<LanguageFreelancrComponent>;
        let service: LanguageFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [LanguageFreelancrComponent],
                providers: [
                    LanguageFreelancrService
                ]
            })
            .overrideTemplate(LanguageFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LanguageFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.languages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
