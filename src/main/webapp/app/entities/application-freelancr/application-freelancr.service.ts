import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ApplicationFreelancr } from './application-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ApplicationFreelancr>;

@Injectable()
export class ApplicationFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/applications';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/applications';
    private resoureByProjectUrl = SERVER_API_URL + 'api/applicationsbyproject';
    private resourceByCurrentUser = SERVER_API_URL + 'api/appsbycurrentuser';
    private resourceOffersUrl = SERVER_API_URL + 'api/offeredapps';

    constructor(private http: HttpClient) { }

    create(application: ApplicationFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(application);
        return this.http.post<ApplicationFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(application: ApplicationFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(application);
        return this.http.put<ApplicationFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ApplicationFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByProject(id: number): Observable<HttpResponse<ApplicationFreelancr[]>> {
        return this.http.get<ApplicationFreelancr[]>(`${this.resoureByProjectUrl}/${id}`, { observe: 'response'})
            .map((res: HttpResponse<ApplicationFreelancr[]>) => this.convertArrayResponse(res));
    }

    findByCurrentUser(): Observable<HttpResponse<ApplicationFreelancr[]>> {
        return this.http.get<ApplicationFreelancr[]>(`${this.resourceByCurrentUser}`, { observe: 'response'})
            .map((res: HttpResponse<ApplicationFreelancr[]>) => this.convertArrayResponse(res));
    }

    findOffersByUser(id: number): Observable<HttpResponse<ApplicationFreelancr[]>> {
        return this.http.get<ApplicationFreelancr[]>(`${this.resourceOffersUrl}/${id}`, { observe: 'response'})
            .map((res: HttpResponse<ApplicationFreelancr[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ApplicationFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApplicationFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ApplicationFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ApplicationFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApplicationFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ApplicationFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ApplicationFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ApplicationFreelancr[]>): HttpResponse<ApplicationFreelancr[]> {
        const jsonResponse: ApplicationFreelancr[] = res.body;
        const body: ApplicationFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ApplicationFreelancr.
     */
    private convertItemFromServer(application: ApplicationFreelancr): ApplicationFreelancr {
        const copy: ApplicationFreelancr = Object.assign({}, application);
        return copy;
    }

    /**
     * Convert a ApplicationFreelancr to a JSON which can be sent to the server.
     */
    private convert(application: ApplicationFreelancr): ApplicationFreelancr {
        const copy: ApplicationFreelancr = Object.assign({}, application);
        return copy;
    }
}
