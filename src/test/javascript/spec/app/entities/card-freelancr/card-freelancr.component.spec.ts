/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { CardFreelancrComponent } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr.component';
import { CardFreelancrService } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr.service';
import { CardFreelancr } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr.model';

describe('Component Tests', () => {

    describe('CardFreelancr Management Component', () => {
        let comp: CardFreelancrComponent;
        let fixture: ComponentFixture<CardFreelancrComponent>;
        let service: CardFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [CardFreelancrComponent],
                providers: [
                    CardFreelancrService
                ]
            })
            .overrideTemplate(CardFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CardFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
