/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { UserFreelancrFreelancrComponent } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr.component';
import { UserFreelancrFreelancrService } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr.service';
import { UserFreelancrFreelancr } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr.model';

describe('Component Tests', () => {

    describe('UserFreelancrFreelancr Management Component', () => {
        let comp: UserFreelancrFreelancrComponent;
        let fixture: ComponentFixture<UserFreelancrFreelancrComponent>;
        let service: UserFreelancrFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [UserFreelancrFreelancrComponent],
                providers: [
                    UserFreelancrFreelancrService
                ]
            })
            .overrideTemplate(UserFreelancrFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFreelancrFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFreelancrFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserFreelancrFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userFreelancrs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
