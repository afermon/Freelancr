import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PositionTypeFreelancr } from './position-type-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PositionTypeFreelancr>;

@Injectable()
export class PositionTypeFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/position-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/position-types';
    private positionsByName =  SERVER_API_URL + 'api/positionsbyname';

    constructor(private http: HttpClient) { }

    create(positionType: PositionTypeFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(positionType);
        return this.http.post<PositionTypeFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(positionType: PositionTypeFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(positionType);
        return this.http.put<PositionTypeFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PositionTypeFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PositionTypeFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PositionTypeFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PositionTypeFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PositionTypeFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PositionTypeFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PositionTypeFreelancr[]>) => this.convertArrayResponse(res));
    }

    findByName(name: string): Observable<HttpResponse<PositionTypeFreelancr[]>> {
        return this.http.get<PositionTypeFreelancr[]>(`${this.positionsByName}/${name}`, { observe: 'response' })
            .map((res: HttpResponse<PositionTypeFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PositionTypeFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PositionTypeFreelancr[]>): HttpResponse<PositionTypeFreelancr[]> {
        const jsonResponse: PositionTypeFreelancr[] = res.body;
        const body: PositionTypeFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PositionTypeFreelancr.
     */
    private convertItemFromServer(positionType: PositionTypeFreelancr): PositionTypeFreelancr {
        const copy: PositionTypeFreelancr = Object.assign({}, positionType);
        return copy;
    }

    /**
     * Convert a PositionTypeFreelancr to a JSON which can be sent to the server.
     */
    private convert(positionType: PositionTypeFreelancr): PositionTypeFreelancr {
        const copy: PositionTypeFreelancr = Object.assign({}, positionType);
        return copy;
    }
}
