/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { NotificationFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/notification-freelancr/notification-freelancr-detail.component';
import { NotificationFreelancrService } from '../../../../../../main/webapp/app/entities/notification-freelancr/notification-freelancr.service';
import { NotificationFreelancr } from '../../../../../../main/webapp/app/entities/notification-freelancr/notification-freelancr.model';

describe('Component Tests', () => {

    describe('NotificationFreelancr Management Detail Component', () => {
        let comp: NotificationFreelancrDetailComponent;
        let fixture: ComponentFixture<NotificationFreelancrDetailComponent>;
        let service: NotificationFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [NotificationFreelancrDetailComponent],
                providers: [
                    NotificationFreelancrService
                ]
            })
            .overrideTemplate(NotificationFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NotificationFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.notification).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
