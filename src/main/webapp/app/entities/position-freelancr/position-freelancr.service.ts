import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PositionFreelancr } from './position-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PositionFreelancr>;

@Injectable()
export class PositionFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/positions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/positions';
    private resourceFindByProject = SERVER_API_URL + 'api/postionsbyproject';
    constructor(private http: HttpClient) { }

    create(position: PositionFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(position);
        return this.http.post<PositionFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(position: PositionFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(position);
        return this.http.put<PositionFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PositionFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PositionFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PositionFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PositionFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PositionFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PositionFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PositionFreelancr[]>) => this.convertArrayResponse(res));
    }

    findByProject(id: number): Observable<HttpResponse<PositionFreelancr[]>> {
        return this.http.get<PositionFreelancr[]>(`${this.resourceFindByProject}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<PositionFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PositionFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PositionFreelancr[]>): HttpResponse<PositionFreelancr[]> {
        const jsonResponse: PositionFreelancr[] = res.body;
        const body: PositionFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PositionFreelancr.
     */
    private convertItemFromServer(position: PositionFreelancr): PositionFreelancr {
        const copy: PositionFreelancr = Object.assign({}, position);
        return copy;
    }

    /**
     * Convert a PositionFreelancr to a JSON which can be sent to the server.
     */
    private convert(position: PositionFreelancr): PositionFreelancr {
        const copy: PositionFreelancr = Object.assign({}, position);
        return copy;
    }
}
