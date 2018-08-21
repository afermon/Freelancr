import {Component, OnInit} from '@angular/core';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {UserFreelancrFreelancr, UserFreelancrFreelancrService} from '../../entities/user-freelancr-freelancr';
import {Principal} from '../../shared';
import {SkillFreelancrService} from '../../entities/skill-freelancr';
import {SkillFreelancr} from '../../entities/skill-freelancr/skill-freelancr.model';
import {JhiAlertService} from 'ng-jhipster';
import {ApplicationFreelancr, ApplicationFreelancrService} from '../../entities/application-freelancr';
import {ApplicationMessageFreelancrService} from '../../entities/application-message-freelancr';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';
import {ProjectFreelancr, ProjectFreelancrService} from '../../entities/project-freelancr';
import {FeedbackFreelancr, FeedbackFreelancrService} from '../../entities/feedback-freelancr';

@Component({
    selector: 'jhi-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: [
        'user-profile.scss'
    ]
})
export class UserProfileComponent implements OnInit {
    currentPage = 'About';
    freelancrAccount: UserFreelancrFreelancr;
    currentAccount: any;
    applications: ApplicationFreelancr[];
    skills: SkillFreelancr[];
    offers: ApplicationFreelancr[];
    delApplication: ApplicationFreelancr;
    closeResult: string;
    currentProject: any;
    positions: PositionFreelancr[];
    projects: ProjectFreelancr[];
    appProjects: ProjectFreelancr[];
    feedbacks: FeedbackFreelancr[];
    rating: number;
    projectAdmin: ProjectFreelancr[];
    projectPosition: PositionFreelancr[];

    constructor(
        private principal: Principal,
        private freelancrService: UserFreelancrFreelancrService,
        private skillFreelancrService: SkillFreelancrService,
        private jhiAlertService: JhiAlertService,
        private applicationService: ApplicationFreelancrService,
        private applicationMsgService: ApplicationMessageFreelancrService,
        private modalService: NgbModal,
        private positionService: PositionFreelancrService,
        private projectService: ProjectFreelancrService,
        private feedbackService: FeedbackFreelancrService
    ) {

        this.freelancrAccount = {};
        this.currentAccount = {};
        this.delApplication = {};
        this.freelancrAccount = {};
        this.currentAccount = {};
        this.currentProject = {};
        this.positions = [];
        this.projects = [];
        this.appProjects = [];
        this.feedbacks = [];
        this.projectAdmin = [];
        this.projectPosition = [];
    }

    ngOnInit() {
        this.loadFreelancrUser();
        this.loadProjects();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadOffers(this.currentAccount.id);
        });
        this.loadAllSkills();
        this.loadApplications();
    }

    loadAllSkills() {
        this.skillFreelancrService.findByUserLogin().subscribe(
            (res: HttpResponse<SkillFreelancr[]>) => {
                this.skills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadApplications() {
        this.applicationService.findByCurrentUser()
            .subscribe((res) => {
                this.applications = res.body;
                this.loadAppMsgs(this.applications);
                this.loadPositionsOfApplications(this.applications);
            });
    }

    loadOffers(id) {
        this.applicationService.findOffersByUser(id)
            .subscribe((res) => {
                this.offers = res.body;
                this.loadAppMsgs(this.offers);
                this.loadPositionsOfApplications(this.offers);
            }, () => {
                this.offers = [];
            });
    }

    loadAppMsgs(applications: ApplicationFreelancr[]) {
        for (const app of applications) {
            this.applicationMsgService.findByApplication(app.id)
                .subscribe((res) => {
                    app.messages = res.body;
                });
        }
    }

    loadFreelancrUser() {
        this.freelancrService.findCurrentLogin()
            .subscribe((userResponse: HttpResponse<UserFreelancrFreelancr>) => {
                this.freelancrAccount = userResponse.body;
                this.loadFeedback(this.freelancrAccount.id);
            });
    }

    loadPositionsOfApplications(appArray) {
        for (let app of appArray) {
            this.positionService.find(app.positionId)
                .subscribe((res) => {
                    this.positions.push(res.body);
                    this.projectService.find(res.body.projectId)
                        .subscribe((pRes) => {
                            if (pRes.body.status.toString() === 'PUBLISHED') {
                                this.appProjects.push(pRes.body);
                            } else {
                                this.applicationMsgService.delete(app.messages[0].id)
                                    .subscribe(() => {
                                        this.applicationService.delete(app.id)
                                            .subscribe(() => {
                                                appArray.splice(appArray.indexOf(app, 0), 1);
                                                this.applications.splice(this.applications.indexOf(app, 0), 1);
                                                app = {};
                                            });
                                    });
                            }
                        });
                });
        }
    }

    loadProjects() {
        this.projectService.findActiveMemberProjects()
            .subscribe((res) => {
                this.projects = res.body;
                for (const p of this.projects) {
                    this.positionService.findByProject(p.id)
                        .subscribe((res3) => {
                            this.projectPosition.push(...res3.body);
                        });
                }
            });
        this.projectService.findByUser()
            .subscribe((res2) => {
                this.projectAdmin = res2.body;
            });
    }

    getPositionOfProject(id) {
        const pos = this.projectPosition.filter((p) => p.projectId === id);
        for (const position of pos) {
            for (const u of position.hiredUsers) {
                if (u.id === this.currentAccount.id) {
                    return position;
                }
            }
        }
    }

    getProjectOfPosition(id) {
        if (this.appProjects.length > 0) {
            return this.findProjectOfPosition(this.positions.filter((pos) => pos.id === id)[0]);
        }
    }

    findProjectOfPosition(position) {
        return this.appProjects.filter((pro) => pro.id === position.projectId)[0].id;
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    getGithubLink() {
        return 'https://github.com/' + this.freelancrAccount.gitUser;
    }

    getFormatedDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return day + ' / ' + month + ' / ' + year;
    }

    deleteApp(application) {
        for (const msg of application.messages) {
            this.applicationMsgService.delete(msg.id)
                .subscribe(() => {
                    this.applicationService.delete(application.id)
                        .subscribe(() => {
                            this.removeApplication(application);
                        });
                });
        }
    }

    removeApplication(application) {
        const appIndex = this.applications.indexOf(application, 0);
        if (appIndex > -1) {
            this.applications.splice(appIndex, 1);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    open(content, application) {
        this.delApplication = application;
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    loadFeedback(id) {
        let avg = 0;
        let cont = 0;
        this.feedbackService.findByUserId(id)
            .subscribe((res) => {
                this.feedbacks = res.body;
                for (const f of this.feedbacks) {
                    avg += f.rating;
                    cont++;
                }
                avg = avg / cont;
                this.freelancrAccount.ranking = Math.floor(avg);
                this.freelancrService.update(this.freelancrAccount)
                    .subscribe((uRes) => {
                        this.freelancrAccount.ranking = uRes.body.ranking;
                        this.rating = uRes.body.ranking;
                    });
            });
    }
}
