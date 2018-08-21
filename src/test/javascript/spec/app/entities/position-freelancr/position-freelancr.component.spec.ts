/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { PositionFreelancrComponent } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr.component';
import { PositionFreelancrService } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr.service';
import { PositionFreelancr } from '../../../../../../main/webapp/app/entities/position-freelancr/position-freelancr.model';

describe('Component Tests', () => {

    describe('PositionFreelancr Management Component', () => {
        let comp: PositionFreelancrComponent;
        let fixture: ComponentFixture<PositionFreelancrComponent>;
        let service: PositionFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [PositionFreelancrComponent],
                providers: [
                    PositionFreelancrService
                ]
            })
            .overrideTemplate(PositionFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PositionFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.positions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
