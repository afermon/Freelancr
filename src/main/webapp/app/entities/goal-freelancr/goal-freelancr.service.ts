import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GoalFreelancr } from './goal-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GoalFreelancr>;

@Injectable()
export class GoalFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/goals';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/goals';
    private resourceFindByProject = SERVER_API_URL + 'api/goalsbyproject';

    constructor(private http: HttpClient) { }

    create(goal: GoalFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(goal);
        return this.http.post<GoalFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(goal: GoalFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(goal);
        return this.http.put<GoalFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GoalFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByProject(id: number): Observable<HttpResponse<GoalFreelancr[]>> {
        return this.http.get<GoalFreelancr[]>(`${this.resourceFindByProject}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<GoalFreelancr[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GoalFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<GoalFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GoalFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<GoalFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<GoalFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GoalFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GoalFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GoalFreelancr[]>): HttpResponse<GoalFreelancr[]> {
        const jsonResponse: GoalFreelancr[] = res.body;
        const body: GoalFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GoalFreelancr.
     */
    private convertItemFromServer(goal: GoalFreelancr): GoalFreelancr {
        const copy: GoalFreelancr = Object.assign({}, goal);
        return copy;
    }

    /**
     * Convert a GoalFreelancr to a JSON which can be sent to the server.
     */
    private convert(goal: GoalFreelancr): GoalFreelancr {
        const copy: GoalFreelancr = Object.assign({}, goal);
        return copy;
    }
}
