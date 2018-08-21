import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UserFreelancrFreelancr, UserFreelancrFreelancrService} from '../../entities/user-freelancr-freelancr';
import {SkillFreelancr} from '../../entities/skill-freelancr/skill-freelancr.model';
import {User, UserService} from '../../shared';
import {ActivatedRoute} from '@angular/router';
import {MessageFreelancr, MessageFreelancrService, MessageStatus} from '../../entities/message-freelancr';
import {Principal} from '../../shared';
import {SkillFreelancrService} from '../../entities/skill-freelancr';
import {ProjectFreelancr, ProjectFreelancrService} from '../../entities/project-freelancr';
import {FeedbackFreelancr, FeedbackFreelancrService} from '../../entities/feedback-freelancr';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';

@Component({
    selector: 'jhi-user-profile-public',
    templateUrl: './user-profile-public.component.html',
    styleUrls: [
        'user-profile-public.scss'
    ]
})
export class UserProfilePublicComponent implements OnInit {
    closeResult: string;
    currentPage = 'About';
    freelancrAccount: any;
    currentAccount: any;
    skills: SkillFreelancr[];
    message: MessageFreelancr;
    projects: ProjectFreelancr[];
    feedbacks: FeedbackFreelancr[];
    rating: number;
    currentUserLogged: any;
    projectAdmin: ProjectFreelancr[];
    projectPosition: PositionFreelancr[];
    constructor(
        private freelancrService: UserFreelancrFreelancrService,
        private userService: UserService,
        private route: ActivatedRoute,
        private messageService: MessageFreelancrService,
        private modalService: NgbModal,
        private principal: Principal,
        private skillService: SkillFreelancrService,
        private projectService: ProjectFreelancrService,
        private feedbackService: FeedbackFreelancrService,
        private positionService: PositionFreelancrService
    ) {
        this.message = {};
        this.currentAccount = {};
        this.freelancrAccount = {};
        this.feedbacks = [];
        this.projectPosition = [];
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadUsers(params['id']);
            this.loadSkills(params['id']);
        });
        this.principal.identity().then( (account) => {
            this.currentUserLogged = account;
        });
    }

    loadUsers(id) {
        this.freelancrService.find(id)
            .subscribe((res: HttpResponse<UserFreelancrFreelancr>) => {
                this.freelancrAccount = res.body;
                this.userService.find(this.freelancrAccount.gitUser)
                    .subscribe((userRes: HttpResponse<User>) => {
                        this.currentAccount = userRes.body;
                        this.loadFeedback(id);
                        this.loadProjects();
                    });
            });
    }

    loadSkills(id) {
        this.skillService.findByUserId(id)
            .subscribe( (res) => {
                this.skills = res.body;
            });
    }

    showPage(page: string) {
        this.currentPage = page;
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

    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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
            return  `with: ${reason}`;
        }
    }

    getCurrentTimeStamp() {
        const timestamp = new Date();
        const day = timestamp.getDay();
        const month = timestamp.getMonth();
        const year = timestamp.getFullYear();
        const hour = timestamp.getHours();
        const minutes = timestamp.getMinutes();

        return day + ' / ' + month + ' / ' + year + ' ' + hour + ':' + minutes;
    }

    toStars(skill: SkillFreelancr) {
        const level = skill.level.toString();
        switch (level) {
            case 'NO_EXPERIENCE': {
                return 1;
            }
            case 'JUNIOR': {
                return 2;
            }
            case 'MID_LEVEL': {
                return 3;
            }
            case 'SENIOR': {
                return 4;
            }
            case 'SME': {
                return 5;
            }
        }
    }

    sendMessage() {
        this.message.receiverLogin = this.freelancrAccount.gitUser;
        this.message.receiverId = this.freelancrAccount.userId;
        this.message.status = MessageStatus.NEW;
        this.message.senderLogin = this.currentUserLogged.login;
        this.message.senderId = this.currentUserLogged.id;
        this.message.timestamp = new Date();
        this.messageService.create(this.message)
            .subscribe(() => {
                this.message = {};
            });
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
                    .subscribe( (uRes) => {
                        this.freelancrAccount.ranking = uRes.body.ranking;
                        this.rating = uRes.body.ranking;
                    });
            });
    }
}
