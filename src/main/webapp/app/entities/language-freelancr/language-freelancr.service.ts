import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LanguageFreelancr } from './language-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LanguageFreelancr>;

@Injectable()
export class LanguageFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/languages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/languages';

    constructor(private http: HttpClient) { }

    create(language: LanguageFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(language);
        return this.http.post<LanguageFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(language: LanguageFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(language);
        return this.http.put<LanguageFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LanguageFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LanguageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<LanguageFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LanguageFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<LanguageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<LanguageFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LanguageFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LanguageFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LanguageFreelancr[]>): HttpResponse<LanguageFreelancr[]> {
        const jsonResponse: LanguageFreelancr[] = res.body;
        const body: LanguageFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LanguageFreelancr.
     */
    private convertItemFromServer(language: LanguageFreelancr): LanguageFreelancr {
        const copy: LanguageFreelancr = Object.assign({}, language);
        return copy;
    }

    /**
     * Convert a LanguageFreelancr to a JSON which can be sent to the server.
     */
    private convert(language: LanguageFreelancr): LanguageFreelancr {
        const copy: LanguageFreelancr = Object.assign({}, language);
        return copy;
    }
}
