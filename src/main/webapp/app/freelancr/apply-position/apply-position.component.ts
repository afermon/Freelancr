import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    ApplicationMessageFreelancr,
    ApplicationMessageFreelancrService
} from '../../entities/application-message-freelancr';
import {
    ApplicationFreelancr,
    ApplicationFreelancrService,
    ApplicationStatus
} from '../../entities/application-freelancr';
import {ProjectFreelancr, ProjectFreelancrService} from '../../entities/project-freelancr';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';
import {Principal, UserService} from '../../shared';
import {MessageStatus} from '../../entities/application-message-freelancr/application-message-freelancr.model';
import {MessageFreelancr, MessageFreelancrService} from '../../entities/message-freelancr';
import { UploadFileService } from '../upload-file.service';
import {UserFreelancrFreelancrService} from '../../entities/user-freelancr-freelancr';

@Component({
    selector: 'jhi-apply-position',
    templateUrl: './apply-position.component.html',
    styles: []
})
export class ApplyPositionComponent implements OnInit {

    applicationMessage: ApplicationMessageFreelancr;
    application: ApplicationFreelancr;
    currentProject: ProjectFreelancr;
    currentPosition: PositionFreelancr;
    message: MessageFreelancr;
    currentAccount: any;
    success: any;
    applied: any;
    userAdmin: any;
    owner: any;
    selectedFiles: FileList;
    userFreelancr: any;
    pLink: any;

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectFreelancrService,
        private applicationService: ApplicationFreelancrService,
        private positionService: PositionFreelancrService,
        private appMessageService: ApplicationMessageFreelancrService,
        private principal: Principal,
        private router: Router,
        private userService: UserService,
        private messageService: MessageFreelancrService,
        private uploadService: UploadFileService,
        private userFreelancrService: UserFreelancrFreelancrService
    ) {
        this.applicationMessage = {};
        this.application = {};
        this.application.messages = [];
        this.currentProject = {};
        this.currentPosition = {};
        this.currentAccount = {};
        this.userAdmin = {};
        this.message = {};
        this.userFreelancr = {};
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.userFreelancrService.findCurrentLogin()
                .subscribe( (res) => {
                    this.userFreelancr = res.body;
                });
        });
        this.route.params.subscribe((params) => {
            this.loadProject(params['project']);
        });
        this.route.params.subscribe((params) => {
            this.loadPosition(params['id']);
        });
    }

    loadProject(id) {
        this.projectService.find(id)
            .subscribe((res) => {
                this.currentProject = res.body;
                this.checkIfUserApplied();
                this.loadAdmin(this.currentProject.userLogin);
                this.owner = this.checkIfUserIsOwner(this.currentProject.userId);

            });
    }

    upload() {
        const file = this.selectedFiles.item(0);
        this.uploadService.uploadfile(file, this.userFreelancr, 'cv');
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    loadPosition(id) {
        this.positionService.find(id)
            .subscribe((res) => {
                this.currentPosition = res.body;
            });
    }

    loadAdmin(login) {
        this.userService.find(login)
            .subscribe((res) => {
                this.userAdmin = res.body;
            });
    }

    sendApplication() {
        this.application.status = ApplicationStatus.APPLIED;
        this.application.userId = this.currentAccount.id;
        this.application.positionId = this.currentPosition.id;
        this.userFreelancr.personalLink = this.pLink;
        if (this.selectedFiles) {
            this.upload();
        }else {
            this.userFreelancrService.update(this.userFreelancr)
                .subscribe();
        }
        this.applicationService.create(this.application)
            .subscribe((res) => {
                this.application = res.body;
                this.applicationMessage.status = MessageStatus.NEW;
                this.applicationMessage.applicationId = this.application.id;
                this.applicationMessage.senderId = this.currentAccount.id;
                this.applicationMessage.receiverId = this.currentProject.userId;
                this.appMessageService.create(this.applicationMessage)
                    .subscribe((mRes) => {
                        this.applicationMessage = mRes.body;
                        this.sendMessage(this.userAdmin.langKey);
                    });
            });
    }

    sendMessage(key) {
        const u = this.currentAccount.login;
        const pos = this.currentPosition.title;
        const proj = this.currentProject.title;
        if (key === 'en') {
            this.message.message = 'You got a new application from the user ' + u + ' to the position ' + pos + ' of the project ' + proj + '.';
            this.message.topic = 'New position application';
        }else {
            this.message.message = 'Recibiste una nueva aplicación del usuario ' + u + ' al puesto ' + pos + ' del proyecto ' + proj + '.';
            this.message.topic = 'Nueva aplicación a puesto';

        }
        this.message.senderId = 4;
        this.message.receiverId = this.currentProject.userId;
        this.messageService.create(this.message)
            .subscribe( () => {
                this.success = true;
                this.redirect();
            });
    }

    redirect() {
        setTimeout(() => {
            this.router.navigate(['/project-info/' + this.currentProject.id]);
        }, 5000);
    }

    checkIfUserApplied() {
        this.applicationService.findByProject(this.currentProject.id)
            .subscribe((res) => {
                const checkApp = res.body.find((app) => app.positionId === this.currentPosition.id);
                if (checkApp) {
                    this.applied = checkApp.userId === this.currentAccount.id;
                } else {
                    this.applied = false;
                }
            });
    }

    checkIfUserIsOwner(id) {
        return this.currentAccount.id === id;
    }

}
