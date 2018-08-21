/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { NotificationFreelancrComponent } from '../../../../../../main/webapp/app/entities/notification-freelancr/notification-freelancr.component';
import { NotificationFreelancrService } from '../../../../../../main/webapp/app/entities/notification-freelancr/notification-freelancr.service';
import { NotificationFreelancr } from '../../../../../../main/webapp/app/entities/notification-freelancr/notification-freelancr.model';

describe('Component Tests', () => {

    describe('NotificationFreelancr Management Component', () => {
        let comp: NotificationFreelancrComponent;
        let fixture: ComponentFixture<NotificationFreelancrComponent>;
        let service: NotificationFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [NotificationFreelancrComponent],
                providers: [
                    NotificationFreelancrService
                ]
            })
            .overrideTemplate(NotificationFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NotificationFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
