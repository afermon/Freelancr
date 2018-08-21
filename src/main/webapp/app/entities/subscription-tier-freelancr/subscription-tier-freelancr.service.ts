import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SubscriptionTierFreelancr } from './subscription-tier-freelancr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubscriptionTierFreelancr>;

@Injectable()
export class SubscriptionTierFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/subscription-tiers';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/subscription-tiers';

    constructor(private http: HttpClient) { }

    create(subscriptionTier: SubscriptionTierFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(subscriptionTier);
        return this.http.post<SubscriptionTierFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subscriptionTier: SubscriptionTierFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(subscriptionTier);
        return this.http.put<SubscriptionTierFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubscriptionTierFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubscriptionTierFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubscriptionTierFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubscriptionTierFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SubscriptionTierFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubscriptionTierFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubscriptionTierFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubscriptionTierFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubscriptionTierFreelancr[]>): HttpResponse<SubscriptionTierFreelancr[]> {
        const jsonResponse: SubscriptionTierFreelancr[] = res.body;
        const body: SubscriptionTierFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubscriptionTierFreelancr.
     */
    private convertItemFromServer(subscriptionTier: SubscriptionTierFreelancr): SubscriptionTierFreelancr {
        const copy: SubscriptionTierFreelancr = Object.assign({}, subscriptionTier);
        return copy;
    }

    /**
     * Convert a SubscriptionTierFreelancr to a JSON which can be sent to the server.
     */
    private convert(subscriptionTier: SubscriptionTierFreelancr): SubscriptionTierFreelancr {
        const copy: SubscriptionTierFreelancr = Object.assign({}, subscriptionTier);
        return copy;
    }
}
