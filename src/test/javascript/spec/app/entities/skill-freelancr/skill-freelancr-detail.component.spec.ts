/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { SkillFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr-detail.component';
import { SkillFreelancrService } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr.service';
import { SkillFreelancr } from '../../../../../../main/webapp/app/entities/skill-freelancr/skill-freelancr.model';

describe('Component Tests', () => {

    describe('SkillFreelancr Management Detail Component', () => {
        let comp: SkillFreelancrDetailComponent;
        let fixture: ComponentFixture<SkillFreelancrDetailComponent>;
        let service: SkillFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SkillFreelancrDetailComponent],
                providers: [
                    SkillFreelancrService
                ]
            })
            .overrideTemplate(SkillFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SkillFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.skill).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
