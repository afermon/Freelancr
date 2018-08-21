import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Principal, User, UserService} from '../../shared';
import {UserFreelancrFreelancr, UserFreelancrFreelancrService} from '../../entities/user-freelancr-freelancr';
import {ProjectFreelancr, ProjectFreelancrService} from '../../entities/project-freelancr';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';
import {
    ApplicationFreelancr,
    ApplicationFreelancrService,
    ApplicationStatus
} from '../../entities/application-freelancr';
import {MessageStatus} from '../../entities/application-message-freelancr/application-message-freelancr.model';
import {MessageFreelancr, MessageFreelancrService} from '../../entities/message-freelancr';
import {
    ApplicationMessageFreelancr,
    ApplicationMessageFreelancrService
} from '../../entities/application-message-freelancr';

@Component({
  selector: 'jhi-offer-position',
  templateUrl: './offer-position.component.html',
  styles: []
})
export class OfferPositionComponent implements OnInit {
    freelancrAccount: any;
    currentAccount: any;
    currentUserLogged: any;
    projects: ProjectFreelancr[];
    selectedProject: ProjectFreelancr;
    positions: PositionFreelancr[];
    selectedPosition: PositionFreelancr;
    application: ApplicationFreelancr;
    message: MessageFreelancr;
    applicationMessage: ApplicationMessageFreelancr;
    success: boolean;
    userAdmin: any;
    constructor(
        private freelancrService: UserFreelancrFreelancrService,
        private projectService: ProjectFreelancrService,
        private positionService: PositionFreelancrService,
        private applicationService: ApplicationFreelancrService,
        private messageService: MessageFreelancrService,
        private appMessageService: ApplicationMessageFreelancrService,
        private userService: UserService,
        private route: ActivatedRoute,
        private principal: Principal,
        private router: Router
    ) {
        this.currentAccount = {};
        this.freelancrAccount = {};
        this.selectedProject = {};
        this.userAdmin = {};
        this.application = {};
        this.applicationMessage = {};
        this.application = {};
        this.selectedProject = {};
        this.userAdmin = {};
        this.message = {};
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadUsers(params['id']);
        });
        this.principal.identity().then( (account) => {
            this.currentUserLogged = account;
        });
        this.loadProjects();
    }

    loadUsers(id) {
        this.freelancrService.find(id)
            .subscribe((res: HttpResponse<UserFreelancrFreelancr>) => {
                this.freelancrAccount = res.body;
                this.userService.find(this.freelancrAccount.gitUser)
                    .subscribe((userRes: HttpResponse<User>) => {
                        this.currentAccount = userRes.body;
                    });
            });
    }

    loadPositions() {
        this.positionService.findByProject(this.selectedProject.id)
            .subscribe((res) => {
                this.positions = res.body;
            });
    }
    loadProjects() {
        this.projectService.findProjectNotFinished()
            .subscribe( (res: HttpResponse<ProjectFreelancr[]>) => {
                this.projects = res.body;
                this.loadAdmin(this.selectedProject.userLogin);
            });
    }

    setProject(id) {
        this.selectedProject = this.projects.find((value) => value.id === parseInt(id, 10));
        this.loadPositions();
    }

    setPosition(id) {
        this.selectedPosition = this.positions.find((value) => value.id === parseInt(id, 10));
    }

    createApplication() {
        this.application = {};
    }
    sendApplication() {
        this.application.status = ApplicationStatus.OFFERED;
        this.application.userId = this.currentUserLogged.id;
        this.application.positionId = this.selectedPosition.id;
        this.applicationService.create(this.application)
            .subscribe((res) => {
                this.application = res.body;
                this.applicationMessage.status = MessageStatus.NEW;
                this.applicationMessage.applicationId = this.application.id;
                this.applicationMessage.senderId = this.currentUserLogged.id;
                this.applicationMessage.receiverId = this.currentAccount.id;
                this.appMessageService.create(this.applicationMessage)
                    .subscribe((mRes) => {
                        this.applicationMessage = mRes.body;
                        this.sendMessage(this.userAdmin.langKey);
                    });
            });
    }
    loadAdmin(login) {
        this.userService.find(login)
            .subscribe((res) => {
                this.userAdmin = res.body;
            });
    }

    sendMessage(key) {
        const u = this.currentAccount.login;
        const pos = this.selectedPosition.title;
        const proj = this.selectedProject.title;
        if (key === 'en') {
            this.message.message = 'You got a new offer from the user ' + u + ' to the position ' + pos + ' of the project ' + proj + '.';
            this.message.topic = 'New offer application';
        }else {
            this.message.message = 'Recibiste una oferta del usuario ' + u + ' al puesto ' + pos + ' del proyecto ' + proj + '.';
            this.message.topic = 'Nueva oferta a puesto';

        }
        this.message.senderId = 4;
        this.message.receiverId = this.selectedProject.userId;
        this.messageService.create(this.message)
            .subscribe( () => {
                this.success = true;
                this.redirectCancel();
            });
    }
    redirect() {
        setTimeout(() => {
            this.router.navigate(['/public-profile/' + this.freelancrAccount.id]);
        }, 5000);
    }

    redirectCancel() {
        this.router.navigate(['/public-profile/' + this.freelancrAccount.id]);
    }
}
