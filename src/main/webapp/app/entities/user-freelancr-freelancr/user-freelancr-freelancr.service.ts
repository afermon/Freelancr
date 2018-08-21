import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { UserFreelancrFreelancr } from './user-freelancr-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserFreelancrFreelancr>;

@Injectable()
export class UserFreelancrFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/user-freelancrs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/user-freelancrs';
    private logedUserUrl = SERVER_API_URL + 'api/logeduser';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(userFreelancr: UserFreelancrFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(userFreelancr);
        return this.http.post<UserFreelancrFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userFreelancr: UserFreelancrFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(userFreelancr);
        return this.http.put<UserFreelancrFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserFreelancrFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findCurrentLogin(): Observable<EntityResponseType> {
        return this.http.get<UserFreelancrFreelancr>(`${this.logedUserUrl}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserFreelancrFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserFreelancrFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserFreelancrFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<UserFreelancrFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserFreelancrFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserFreelancrFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserFreelancrFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserFreelancrFreelancr[]>): HttpResponse<UserFreelancrFreelancr[]> {
        const jsonResponse: UserFreelancrFreelancr[] = res.body;
        const body: UserFreelancrFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserFreelancrFreelancr.
     */
    private convertItemFromServer(userFreelancr: UserFreelancrFreelancr): UserFreelancrFreelancr {
        const copy: UserFreelancrFreelancr = Object.assign({}, userFreelancr);
        copy.birthDate = this.dateUtils
            .convertLocalDateFromServer(userFreelancr.birthDate);
        return copy;
    }

    /**
     * Convert a UserFreelancrFreelancr to a JSON which can be sent to the server.
     */
    private convert(userFreelancr: UserFreelancrFreelancr): UserFreelancrFreelancr {
        const copy: UserFreelancrFreelancr = Object.assign({}, userFreelancr);
        // copy.birthDate = this.dateUtils
        //     .convertLocalDateToServer(userFreelancr.birthDate);
        return copy;
    }
}
