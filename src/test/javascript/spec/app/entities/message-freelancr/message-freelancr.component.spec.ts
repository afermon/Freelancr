/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { MessageFreelancrComponent } from '../../../../../../main/webapp/app/entities/message-freelancr/message-freelancr.component';
import { MessageFreelancrService } from '../../../../../../main/webapp/app/entities/message-freelancr/message-freelancr.service';
import { MessageFreelancr } from '../../../../../../main/webapp/app/entities/message-freelancr/message-freelancr.model';

describe('Component Tests', () => {

    describe('MessageFreelancr Management Component', () => {
        let comp: MessageFreelancrComponent;
        let fixture: ComponentFixture<MessageFreelancrComponent>;
        let service: MessageFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [MessageFreelancrComponent],
                providers: [
                    MessageFreelancrService
                ]
            })
            .overrideTemplate(MessageFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MessageFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.messages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
