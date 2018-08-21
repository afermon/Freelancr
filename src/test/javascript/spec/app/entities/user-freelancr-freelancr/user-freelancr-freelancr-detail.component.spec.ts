/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { UserFreelancrFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr-detail.component';
import { UserFreelancrFreelancrService } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr.service';
import { UserFreelancrFreelancr } from '../../../../../../main/webapp/app/entities/user-freelancr-freelancr/user-freelancr-freelancr.model';

describe('Component Tests', () => {

    describe('UserFreelancrFreelancr Management Detail Component', () => {
        let comp: UserFreelancrFreelancrDetailComponent;
        let fixture: ComponentFixture<UserFreelancrFreelancrDetailComponent>;
        let service: UserFreelancrFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [UserFreelancrFreelancrDetailComponent],
                providers: [
                    UserFreelancrFreelancrService
                ]
            })
            .overrideTemplate(UserFreelancrFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFreelancrFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFreelancrFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserFreelancrFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userFreelancr).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
