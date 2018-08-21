import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ApplicationMessageFreelancr } from './application-message-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ApplicationMessageFreelancr>;

@Injectable()
export class ApplicationMessageFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/application-messages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/application-messages';
    private getByApplicationUrl = SERVER_API_URL + 'api/messagessbyapplication';

    constructor(private http: HttpClient) { }

    create(applicationMessage: ApplicationMessageFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(applicationMessage);
        return this.http.post<ApplicationMessageFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(applicationMessage: ApplicationMessageFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(applicationMessage);
        return this.http.put<ApplicationMessageFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ApplicationMessageFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByApplication(id: number): Observable<HttpResponse<ApplicationMessageFreelancr[]>> {
        return this.http.get<ApplicationMessageFreelancr[]>(`${this.getByApplicationUrl}/${id}`, { observe: 'response'})
            .map((res: HttpResponse<ApplicationMessageFreelancr[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ApplicationMessageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApplicationMessageFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ApplicationMessageFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ApplicationMessageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApplicationMessageFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ApplicationMessageFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ApplicationMessageFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ApplicationMessageFreelancr[]>): HttpResponse<ApplicationMessageFreelancr[]> {
        const jsonResponse: ApplicationMessageFreelancr[] = res.body;
        const body: ApplicationMessageFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ApplicationMessageFreelancr.
     */
    private convertItemFromServer(applicationMessage: ApplicationMessageFreelancr): ApplicationMessageFreelancr {
        const copy: ApplicationMessageFreelancr = Object.assign({}, applicationMessage);
        return copy;
    }

    /**
     * Convert a ApplicationMessageFreelancr to a JSON which can be sent to the server.
     */
    private convert(applicationMessage: ApplicationMessageFreelancr): ApplicationMessageFreelancr {
        const copy: ApplicationMessageFreelancr = Object.assign({}, applicationMessage);
        return copy;
    }
}
