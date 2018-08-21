import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjectFreelancr, ProjectFreelancrService} from '../../entities/project-freelancr';
import {Principal, User} from '../../shared';
import {JhiAlertService} from 'ng-jhipster';
import {SlackMessage} from '../../entities/project-freelancr/slackMessage.model';
import {GithubCommit} from '../../entities/project-freelancr/githubCommit.model';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';
import {FeedbackFreelancr, FeedbackFreelancrService} from '../../entities/feedback-freelancr';
import {ProjectInfoComponent} from '..';

@Component({
    selector: 'jhi-project-status',
    templateUrl: './project-status.component.html',
    styleUrls: [
        'project-status.scss'
    ],
})
export class ProjectStatusComponent implements OnInit {
    currentProject: ProjectFreelancr;
    isUserAdmin: any;
    currentUser: User;
    working = false;
    positions: PositionFreelancr[];
    slackMessages: SlackMessage[];
    githubCommits: GithubCommit[];
    finishSection: boolean;
    feedback: FeedbackFreelancr[];
    succesFeedback: boolean;
    feedbackActive: any;

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectFreelancrService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private positionService: PositionFreelancrService,
        private feedbackService: FeedbackFreelancrService,
        private projectInfo: ProjectInfoComponent
    ) {
        this.positions = [];
        this.finishSection = false;
        this.feedback = [];
        this.succesFeedback = false;
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadProject(params['id']);
        });
    }

    loadPosition(id) {
        this.positionService.findByProject(id)
            .subscribe((res) => {
                this.positions = res.body;
                this.loadUsersHired();
            });
    }

    loadUsersHired() {
        if (this.currentProject.status.toString() === 'FINISHED') {
            if (this.positions.length > 0) {
                for (const p of this.positions) {
                    for (const u of p.hiredUsers) {
                        if (!this.feedback.filter((fe) => fe.userId === u.id)[0]) {
                            this.feedbackService.checkExists(u.id, this.currentProject.id)
                                .subscribe((res) => {
                                    if (res.body.length === 0) {
                                        const f = new FeedbackFreelancr();
                                        f.userId = u.id;
                                        f.userLogin = u.login;
                                        f.rating = 1;
                                        this.feedback.push(f);
                                        this.feedbackActive = true;
                                    }
                                });
                        }
                    }
                }
            }
        }
    }

    sendFeedback(f: FeedbackFreelancr) {
        f.projectId = this.currentProject.id;
        f.projectTitle = this.currentProject.title;
        f.timeStamp = new Date().toISOString().slice(0, 16);
        this.feedbackService.create(f)
            .subscribe(() => {
                const index = this.feedback.indexOf(f, 0);
                this.succesFeedback = true;
                if (index > -1) {
                    this.feedback.splice(index, 1);
                    f = {};
                }
                setTimeout(() => {
                    this.succesFeedback = false;
                }, 3500);
                setTimeout(() => {
                    if (this.feedback.length === 0) {
                        this.feedbackActive = false;
                    }
                }, 3500);

            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    loadProject(id) {
        this.projectService.find(id)
            .subscribe((res) => {
                this.currentProject = res.body;
                this.principal.identity().then((account) => {
                    this.isUserAdmin = account.id === this.currentProject.userId;
                    this.currentUser = account;
                });
                if (this.currentProject.slackChannel) {
                    this.getSlackMessages();
                    this.getGithubCommits();
                }
                this.loadPosition(this.currentProject.id);
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    startProject() {
        this.working = true;
        this.projectService.start(this.currentProject).subscribe((res) => {
            this.currentProject = res.body;
            this.getSlackMessages();
            this.getGithubCommits();
            this.working = false;
        }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    finishProject() {
        this.working = true;
        this.projectService.finish(this.currentProject).subscribe((res) => {
            this.currentProject = res.body;
            this.working = false;
            this.finishSection = true;
            this.loadUsersHired();
            this.projectInfo.currentProject = this.currentProject;
        }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    getSlackMessages() {
        this.projectService.getSlackMessages(this.currentProject.id).subscribe((res) => {
            this.slackMessages = res.body;
        }, (res: HttpErrorResponse) => this.onError(res.error));
    }

    getGithubCommits() {
        this.projectService.getGithubCommits(this.currentProject.id).subscribe((res) => {
            this.githubCommits = res.body;
        }, (res: HttpErrorResponse) => this.onError(res.error));
    }

    private onError(error) {
        this.working = false;
        this.jhiAlertService.error(error.message, null, null);
    }
}
