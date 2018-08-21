/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { LanguageFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/language-freelancr/language-freelancr-detail.component';
import { LanguageFreelancrService } from '../../../../../../main/webapp/app/entities/language-freelancr/language-freelancr.service';
import { LanguageFreelancr } from '../../../../../../main/webapp/app/entities/language-freelancr/language-freelancr.model';

describe('Component Tests', () => {

    describe('LanguageFreelancr Management Detail Component', () => {
        let comp: LanguageFreelancrDetailComponent;
        let fixture: ComponentFixture<LanguageFreelancrDetailComponent>;
        let service: LanguageFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [LanguageFreelancrDetailComponent],
                providers: [
                    LanguageFreelancrService
                ]
            })
            .overrideTemplate(LanguageFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LanguageFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.language).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
