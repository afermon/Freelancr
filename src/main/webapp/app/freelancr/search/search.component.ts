import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ProjectFreelancr, ProjectFreelancrService } from '../../entities/project-freelancr';
import { UserFreelancrFreelancr, UserFreelancrFreelancrService } from '../../entities/user-freelancr-freelancr';
import { SkillTypeFreelancr, SkillTypeFreelancrService } from '../../entities/skill-type-freelancr';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
    styleUrls: [
        'search.scss'
    ]
})
export class SearchComponent implements OnInit, OnDestroy {
    currentAccount: any;
    projects: ProjectFreelancr[];
    freelancrs: UserFreelancrFreelancr[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    searchType: any;

    constructor(
        private projectService: ProjectFreelancrService,
        private userFreelancrFrelancrService: UserFreelancrFreelancrService,
        private skillTypeService: SkillTypeFreelancrService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
        this.searchType = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['type'] ?
            this.activatedRoute.snapshot.params['type'] : 'project';
    }

    loadAll() {
        if (this.currentSearch) {
            switch (this.searchType) {
                case 'project':
                    this.projectService.search({
                        page: this.page - 1,
                        query: this.currentSearch,
                        size: this.itemsPerPage,
                        sort: this.sort()
                    }).subscribe(
                        (res: HttpResponse<ProjectFreelancr[]>) => this.onSuccess(res.body, res.headers),
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                    break;
                case 'freelancr':
                    this.userFreelancrFrelancrService.search({
                        page: this.page - 1,
                        query: this.currentSearch,
                        size: this.itemsPerPage,
                        sort: this.sort()
                    }).subscribe(
                        (res: HttpResponse<UserFreelancrFreelancr[]>) => this.onSuccess(res.body, res.headers),
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                    break;
            }
            return;
        }
        switch (this.searchType) {
            case 'project':
                this.projectService.query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()}).subscribe(
                    (res: HttpResponse<ProjectFreelancr[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
                break;
            case 'freelancr':
                this.userFreelancrFrelancrService.query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()}).subscribe(
                    (res: HttpResponse<UserFreelancrFreelancr[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
                break;
        }
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/search'], {queryParams:
                {
                    type: this.searchType,
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/search', {
            type: this.searchType,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    typeaheadSearch = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .switchMap((term) => term.length < 2 ? [] :
                this.skillTypeService.findByName(term).map((typeResponse: HttpResponse<SkillTypeFreelancr[]>) => this.getTypeaheadResults(typeResponse.body))
            )

    private getTypeaheadResults(skillTypes: SkillTypeFreelancr[]) {
        return skillTypes.map( function(skillType){
            return skillType.name;
        });
    }

    keyDownFunction(event) {
        if (event.keyCode === 13) {
            this.search(this.currentSearch);
        }
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/search', {
            search: this.currentSearch,
            type: this.searchType,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    changeSearchType(sType) {
        this.searchType = sType;
        this.transition();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProjects();
        this.registerChangeInFreelancrs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProjectFreelancr) {
        return item.id;
    }

    trackIdFreelancr(index: number, item: UserFreelancrFreelancr) {
        return item.id;
    }

    registerChangeInProjects() {
        this.eventSubscriber = this.eventManager.subscribe('projectListModification', (response) => this.loadAll());
    }

    registerChangeInFreelancrs() {
        this.eventSubscriber = this.eventManager.subscribe('userFreelancrListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        switch (this.searchType) {
            case 'project':
                this.processProjects(data);
                this.freelancrs = [];
                break;
            case 'freelancr':
                this.freelancrs = data;
                this.projects = [];
                break;
        }
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private processProjects(data) {
        this.projects = data;
        for ( const project of this.projects ){
            project.positionCount = 0;
            if (!project.positions || project.positions.length === 0) {
                this.projectService.find(project.id).subscribe((res) => {
                    const result = this.projects.find((obj) => {
                        return obj.id === res.body.id;
                    });
                    result.positions = res.body.positions;
                    result.skills = [];
                    for (const position of result.positions) {
                        project.positionCount += position.quantity;
                        for ( const skillType of position.skills) {
                            result.skills.push(skillType);
                        }
                    }
                });
            }
            project.skills = [];
            for (const position of project.positions) {
                for ( const skillType of position.skills) {
                    project.skills.push(skillType);
                }
            }
        }
    }
}
