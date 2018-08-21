/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { CardFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr-detail.component';
import { CardFreelancrService } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr.service';
import { CardFreelancr } from '../../../../../../main/webapp/app/entities/card-freelancr/card-freelancr.model';

describe('Component Tests', () => {

    describe('CardFreelancr Management Detail Component', () => {
        let comp: CardFreelancrDetailComponent;
        let fixture: ComponentFixture<CardFreelancrDetailComponent>;
        let service: CardFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [CardFreelancrDetailComponent],
                providers: [
                    CardFreelancrService
                ]
            })
            .overrideTemplate(CardFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CardFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.card).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
