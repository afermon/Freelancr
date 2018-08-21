/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FreelancrTestModule } from '../../../test.module';
import { PositionTypeFreelancrDetailComponent } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr-detail.component';
import { PositionTypeFreelancrService } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr.service';
import { PositionTypeFreelancr } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr.model';

describe('Component Tests', () => {

    describe('PositionTypeFreelancr Management Detail Component', () => {
        let comp: PositionTypeFreelancrDetailComponent;
        let fixture: ComponentFixture<PositionTypeFreelancrDetailComponent>;
        let service: PositionTypeFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [PositionTypeFreelancrDetailComponent],
                providers: [
                    PositionTypeFreelancrService
                ]
            })
            .overrideTemplate(PositionTypeFreelancrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionTypeFreelancrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionTypeFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PositionTypeFreelancr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.positionType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
