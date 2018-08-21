/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { SkillTypeFreelancrComponent } from '../../../../../../main/webapp/app/entities/skill-type-freelancr/skill-type-freelancr.component';
import { SkillTypeFreelancrService } from '../../../../../../main/webapp/app/entities/skill-type-freelancr/skill-type-freelancr.service';
import { SkillTypeFreelancr } from '../../../../../../main/webapp/app/entities/skill-type-freelancr/skill-type-freelancr.model';

describe('Component Tests', () => {

    describe('SkillTypeFreelancr Management Component', () => {
        let comp: SkillTypeFreelancrComponent;
        let fixture: ComponentFixture<SkillTypeFreelancrComponent>;
        let service: SkillTypeFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SkillTypeFreelancrComponent],
                providers: [
                    SkillTypeFreelancrService
                ]
            })
            .overrideTemplate(SkillTypeFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillTypeFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillTypeFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SkillTypeFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.skillTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
