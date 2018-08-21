/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { PositionFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr-detail.component';
import { PositionFreelancrService } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr.service';
import { PositionFreelancr } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr.model';

describe('Component Tests', () => {

    describe('PositionFreelancr Management Detail Component', () => {
        let comp: PositionFreelancrDetailComponent;
        let fixture: ComponentFixture<PositionFreelancrDetailComponent>;
        let service: PositionFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [PositionFreelancrDetailComponent],
                providers: [
                    PositionFreelancrService
                ]
            })
            .overrideTemplate(PositionFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PositionFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.position).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
