import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SkillTypeFreelancr } from './skill-type-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SkillTypeFreelancr>;

@Injectable()
export class SkillTypeFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/skill-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/skill-types';
    private skillsByName =  SERVER_API_URL + 'api/skillsbyname';

    constructor(private http: HttpClient) { }

    create(skillType: SkillTypeFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(skillType);
        return this.http.post<SkillTypeFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(skillType: SkillTypeFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(skillType);
        return this.http.put<SkillTypeFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SkillTypeFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SkillTypeFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<SkillTypeFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SkillTypeFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SkillTypeFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<SkillTypeFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SkillTypeFreelancr[]>) => this.convertArrayResponse(res));
    }

    findByName(name: string): Observable<HttpResponse<SkillTypeFreelancr[]>> {
        return this.http.get<SkillTypeFreelancr[]>(`${this.skillsByName}/${name}`, { observe: 'response' })
            .map((res: HttpResponse<SkillTypeFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SkillTypeFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SkillTypeFreelancr[]>): HttpResponse<SkillTypeFreelancr[]> {
        const jsonResponse: SkillTypeFreelancr[] = res.body;
        const body: SkillTypeFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SkillTypeFreelancr.
     */
    private convertItemFromServer(skillType: SkillTypeFreelancr): SkillTypeFreelancr {
        const copy: SkillTypeFreelancr = Object.assign({}, skillType);
        return copy;
    }

    /**
     * Convert a SkillTypeFreelancr to a JSON which can be sent to the server.
     */
    private convert(skillType: SkillTypeFreelancr): SkillTypeFreelancr {
        const copy: SkillTypeFreelancr = Object.assign({}, skillType);
        return copy;
    }
}
