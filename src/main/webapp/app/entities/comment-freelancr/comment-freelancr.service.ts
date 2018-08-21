import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CommentFreelancr } from './comment-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CommentFreelancr>;

@Injectable()
export class CommentFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/comments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/comments';
    private commentByProjectUrl = SERVER_API_URL + 'api/commentbyproject';
    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(comment: CommentFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(comment);
        return this.http.post<CommentFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comment: CommentFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(comment);
        return this.http.put<CommentFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CommentFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CommentFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommentFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CommentFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommentFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CommentFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CommentFreelancr[]>): HttpResponse<CommentFreelancr[]> {
        const jsonResponse: CommentFreelancr[] = res.body;
        const body: CommentFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CommentFreelancr.
     */
    private convertItemFromServer(comment: CommentFreelancr): CommentFreelancr {
        const copy: CommentFreelancr = Object.assign({}, comment);
        copy.timestamp = this.dateUtils
            .convertDateTimeFromServer(comment.timestamp);
        return copy;
    }

    /**
     * Convert a CommentFreelancr to a JSON which can be sent to the server.
     */
    private convert(comment: CommentFreelancr): CommentFreelancr {
        const copy: CommentFreelancr = Object.assign({}, comment);

        // copy.timestamp = this.dateUtils.toDate(comment.timestamp);
        return copy;
    }

    findCommentByProjectId(id: number): Observable<HttpResponse<CommentFreelancr[]>> {
        return this.http.get<CommentFreelancr[]>(`${this.commentByProjectUrl}/${id}`, {observe: 'response' })
            .map((res: HttpResponse<CommentFreelancr[]>) => this.convertArrayResponse(res));
    }
}
