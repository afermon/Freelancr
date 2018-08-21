import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { ProjectFreelancr } from './project-freelancr.model';
import { SlackMessage } from './slackMessage.model';
import { createRequestOption } from '../../shared';
import {GithubCommit} from './githubCommit.model';

export type EntityResponseType = HttpResponse<ProjectFreelancr>;

@Injectable()
export class ProjectFreelancrService {

    private resourceUrl =  SERVER_API_URL + 'api/projects';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/projects';
    private projectNotFinished = SERVER_API_URL + 'api/notfinished';
    private resourceByUserUrl = SERVER_API_URL + 'api/projectbyuser';
    private projectStartUrl = SERVER_API_URL + 'api/projectstart';
    private projectFinishUrl = SERVER_API_URL + 'api/projectfinish';
    private projectActiveUserUrl = SERVER_API_URL + 'api/projectactivemember';
    private projectSlackMessagesUrl = SERVER_API_URL + 'api/projectslackmessages';
    private projectGithubCommitsUrl = SERVER_API_URL + 'api/projectrepocommits';

    constructor(private http: HttpClient) { }

    create(project: ProjectFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(project);
        return this.http.post<ProjectFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(project: ProjectFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(project);
        return this.http.put<ProjectFreelancr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProjectFreelancr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProjectFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProjectFreelancr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProjectFreelancr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ProjectFreelancr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProjectFreelancr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProjectFreelancr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProjectFreelancr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProjectFreelancr[]>): HttpResponse<ProjectFreelancr[]> {
        const jsonResponse: ProjectFreelancr[] = res.body;
        const body: ProjectFreelancr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProjectFreelancr.
     */
    private convertItemFromServer(project: ProjectFreelancr): ProjectFreelancr {
        const copy: ProjectFreelancr = Object.assign({}, project);
        // copy.deadline = this.dateUtils
        //     .convertLocalDateFromServer(project.deadline);
        // copy.startDate = this.dateUtils
        //     .convertLocalDateFromServer(project.startDate);
        // copy.endDate = this.dateUtils
        //     .convertLocalDateFromServer(project.endDate);
        return copy;
    }

    /**
     * Convert a ProjectFreelancr to a JSON which can be sent to the server.
     */
    private convert(project: ProjectFreelancr): ProjectFreelancr {
        const copy: ProjectFreelancr = Object.assign({}, project);
        // copy.deadline = this.dateUtils
        //     .convertLocalDateToServer(project.deadline);
        // copy.startDate = this.dateUtils
        //     .convertLocalDateToServer(project.startDate);
        // copy.endDate = this.dateUtils
        //     .convertLocalDateToServer(project.endDate);
        return copy;
    }

    findProjectNotFinished(): Observable<HttpResponse<ProjectFreelancr[]>> {
        return this.http.get<ProjectFreelancr[]>(this.projectNotFinished, {observe: 'response'});
    }

    findByUser(): Observable<HttpResponse<ProjectFreelancr[]>> {
        return this.http.get<ProjectFreelancr[]>(this.resourceByUserUrl, { observe: 'response' })
            .map((res: HttpResponse<ProjectFreelancr[]>) => this.convertArrayResponse(res));
    }

    start(project: ProjectFreelancr): Observable<EntityResponseType> {
        const copy = this.convert(project);
        return this.http.put<ProjectFreelancr>(this.projectStartUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    finish(project: ProjectFreelancr) {
        const copy = this.convert(project);
        return this.http.put<ProjectFreelancr>(this.projectFinishUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findActiveMemberProjects() {
        return this.http.get<ProjectFreelancr[]>(this.projectActiveUserUrl, { observe: 'response' })
            .map((res: HttpResponse<ProjectFreelancr[]>) => this.convertArrayResponse(res));
    }

    getSlackMessages(id: number): Observable<HttpResponse<SlackMessage[]>> {
        return this.http.get<SlackMessage[]>(`${this.projectSlackMessagesUrl}/${id}`, {observe: 'response'});
    }

    getGithubCommits(id: number): Observable<HttpResponse<SlackMessage[]>> {
        return this.http.get<GithubCommit[]>(`${this.projectGithubCommitsUrl}/${id}`, {observe: 'response'});
    }
}
