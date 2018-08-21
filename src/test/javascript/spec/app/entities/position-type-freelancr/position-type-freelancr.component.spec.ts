/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FreelancrTestModule } from '../../../test.module';
import { PositionTypeFreelancrComponent } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr.component';
import { PositionTypeFreelancrService } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr.service';
import { PositionTypeFreelancr } from '../../../../../../main/webapp/app/entities/position-type-freelancr/position-type-freelancr.model';

describe('Component Tests', () => {

    describe('PositionTypeFreelancr Management Component', () => {
        let comp: PositionTypeFreelancrComponent;
        let fixture: ComponentFixture<PositionTypeFreelancrComponent>;
        let service: PositionTypeFreelancrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [PositionTypeFreelancrComponent],
                providers: [
                    PositionTypeFreelancrService
                ]
            })
            .overrideTemplate(PositionTypeFreelancrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionTypeFreelancrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionTypeFreelancrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PositionTypeFreelancr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.positionTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
