/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { SkillFreelancrComponent } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr.component';
import { SkillFreelancrService } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr.service';
import { SkillFreelancr } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr.model';

describe('Component Tests', () => {

    describe('SkillFreelancr Management Component', () => {
        let comp: SkillFreelancrComponent;
        let fixture: ComponentFixture<SkillFreelancrComponent>;
        let service: SkillFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SkillFreelancrComponent],
                providers: [
                    SkillFreelancrService
                ]
            })
            .overrideTemplate(SkillFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SkillFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.skills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
