import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CardFreelancr } from './card-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CardFreelancr>;

@Injectable()
export class CardFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/cards';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cards';
    private resourceFindByProject = SERVER_API_URL + 'api/cardsbyproject';
    private resourceAssigned = SERVER_API_URL + 'api/assigned';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(card: CardFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.post<CardFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(card: CardFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.put<CardFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CardFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CardFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardFreelancr[]>) => this.convertArrayResponse(res));
    }

    findByProject(id: number): Observable<HttpResponse<CardFreelancr[]>> {
        return this.http.get<CardFreelancr[]>(`${this.resourceFindByProject}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<CardFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CardFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardFreelancr[]>) => this.convertArrayResponse(res));
    }

    getAssigned(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceAssigned}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CardFreelancr[]>): HttpResponse<CardFreelancr[]> {
        const jsonResponse: CardFreelancr[] = res.body;
        const body: CardFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CardFreelancr.
     */
    private convertItemFromServer(card: CardFreelancr): CardFreelancr {
        const copy: CardFreelancr = Object.assign({}, card);
        copy.deadline = this.dateUtils
            .convertLocalDateFromServer(card.deadline);
        return copy;
    }

    /**
     * Convert a CardFreelancr to a JSON which can be sent to the server.
     */
    private convert(card: CardFreelancr): CardFreelancr {
        const copy: CardFreelancr = Object.assign({}, card);
        copy.deadline = this.dateUtils
            .convertLocalDateToServer(card.deadline);
        return copy;
    }
}
