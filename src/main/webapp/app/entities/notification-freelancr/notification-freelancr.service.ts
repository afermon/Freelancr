import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NotificationFreelancr } from './notification-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NotificationFreelancr>;

@Injectable()
export class NotificationFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/notifications';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/notifications';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(notification: NotificationFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(notification);
        return this.http.post<NotificationFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(notification: NotificationFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(notification);
        return this.http.put<NotificationFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NotificationFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NotificationFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<NotificationFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NotificationFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<NotificationFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<NotificationFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NotificationFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NotificationFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NotificationFreelancr[]>): HttpResponse<NotificationFreelancr[]> {
        const jsonResponse: NotificationFreelancr[] = res.body;
        const body: NotificationFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NotificationFreelancr.
     */
    private convertItemFromServer(notification: NotificationFreelancr): NotificationFreelancr {
        const copy: NotificationFreelancr = Object.assign({}, notification);
        copy.timestamp = this.dateUtils
            .convertDateTimeFromServer(notification.timestamp);
        return copy;
    }

    /**
     * Convert a NotificationFreelancr to a JSON which can be sent to the server.
     */
    private convert(notification: NotificationFreelancr): NotificationFreelancr {
        const copy: NotificationFreelancr = Object.assign({}, notification);

        copy.timestamp = this.dateUtils.toDate(notification.timestamp);
        return copy;
    }
}
