import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';
import {MessageFreelancr, MessageStatus} from './message-freelancr.model';
import { createRequestOption } from '../../shared';
export type EntityResponseType = HttpResponse<MessageFreelancr>;

@Injectable()
export class MessageFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/messages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/messages';
    private messageByCurrentUserUrl = SERVER_API_URL + 'api/msgCurrentUser';
    private messageByUserSenderUrl = SERVER_API_URL + 'api/msgSenderCurrentUser';
    private unreadUrl = SERVER_API_URL + 'api/unread';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(message: MessageFreelancr): Observable<EntityResponseType> {
        message.status = MessageStatus.NEW;
        message.timestamp = new Date();
        const copy = this.convert(message);
        return this.http.post<MessageFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(message: MessageFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(message);
        return this.http.put<MessageFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MessageFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MessageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    findMessageByCurrentUserRecieved(req?: any): Observable<HttpResponse<MessageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageFreelancr[]>(this.messageByCurrentUserUrl, { params: options, observe: 'response'})
            .map((res: HttpResponse<MessageFreelancr[]>) => this.convertArrayResponse(res));
    }

    findMessageByCurrentUserSent(req?: any): Observable<HttpResponse<MessageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageFreelancr[]>(this.messageByUserSenderUrl, { params: options, observe: 'response'})
            .map((res: HttpResponse<MessageFreelancr[]>) => this.convertArrayResponse(res));
    }
    search(req?: any): Observable<HttpResponse<MessageFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageFreelancr[]>) => this.convertArrayResponse(res));
    }

    getUnread(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.unreadUrl}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MessageFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MessageFreelancr[]>): HttpResponse<MessageFreelancr[]> {
        const jsonResponse: MessageFreelancr[] = res.body;
        const body: MessageFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MessageFreelancr.
     */
    private convertItemFromServer(message: MessageFreelancr): MessageFreelancr {
        const copy: MessageFreelancr = Object.assign({}, message);
        copy.timestamp = this.dateUtils
            .convertDateTimeFromServer(message.timestamp);
        return copy;
    }

    /**
     * Convert a MessageFreelancr to a JSON which can be sent to the server.
     */
    private convert(message: MessageFreelancr): MessageFreelancr {
        const copy: MessageFreelancr = Object.assign({}, message);

        // copy.timestamp = this.dateUtils.toDate(message.timestamp);
        return copy;
    }

}
