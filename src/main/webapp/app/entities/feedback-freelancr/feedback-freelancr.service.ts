import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FeedbackFreelancr } from './feedback-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FeedbackFreelancr>;

@Injectable()
export class FeedbackFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/feedbacks';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/feedbacks';
    private userIdUrl = SERVER_API_URL + 'api/feedbackbyid';
    private checkExistsUrl = SERVER_API_URL + 'api/checkfeedback';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(feedback: FeedbackFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(feedback);
        return this.http.post<FeedbackFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(feedback: FeedbackFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(feedback);
        return this.http.put<FeedbackFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FeedbackFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FeedbackFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<FeedbackFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FeedbackFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    checkExists(uid: number, pid: number): Observable<HttpResponse<FeedbackFreelancr[]>> {
        return this.http.get<FeedbackFreelancr[]>(`${this.checkExistsUrl}/${uid}/${pid}`, {observe: 'response' })
            .map((res: HttpResponse<FeedbackFreelancr[]>) => this.convertArrayResponse(res));
    }

    search(req?: any): Observable<HttpResponse<FeedbackFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<FeedbackFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FeedbackFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FeedbackFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FeedbackFreelancr[]>): HttpResponse<FeedbackFreelancr[]> {
        const jsonResponse: FeedbackFreelancr[] = res.body;
        const body: FeedbackFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FeedbackFreelancr.
     */
    private convertItemFromServer(feedback: FeedbackFreelancr): FeedbackFreelancr {
        const copy: FeedbackFreelancr = Object.assign({}, feedback);
        copy.timeStamp = this.dateUtils
            .convertDateTimeFromServer(feedback.timeStamp);
        return copy;
    }

    /**
     * Convert a FeedbackFreelancr to a JSON which can be sent to the server.
     */
    private convert(feedback: FeedbackFreelancr): FeedbackFreelancr {
        const copy: FeedbackFreelancr = Object.assign({}, feedback);

        copy.timeStamp = this.dateUtils.toDate(feedback.timeStamp);
        return copy;
    }

    findByUserId(id: number): Observable<HttpResponse<FeedbackFreelancr[]>> {
        return this.http.get<FeedbackFreelancr[]>(`${this.userIdUrl}/${id}`, {observe: 'response' })
            .map((res: HttpResponse<FeedbackFreelancr[]>) => this.convertArrayResponse(res));
    }
}
