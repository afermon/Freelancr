import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectFreelancrService} from '../../entities/project-freelancr';
import {GoalFreelancr, GoalFreelancrService} from '../../entities/goal-freelancr';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';
import {Principal, UserService} from '../../shared';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';
import {SkillTypeFreelancr, SkillTypeFreelancrService} from '../../entities/skill-type-freelancr';
import {PositionTypeFreelancr, PositionTypeFreelancrService} from '../../entities/position-type-freelancr';
import {HttpResponse} from '@angular/common/http';
import {
    ApplicationFreelancr,
    ApplicationFreelancrService,
    ApplicationStatus
} from '../../entities/application-freelancr';
import {ApplicationMessageFreelancrService} from '../../entities/application-message-freelancr';
import {MessageFreelancr, MessageFreelancrService} from '../../entities/message-freelancr';
import {CommentFreelancr, CommentFreelancrService} from '../../entities/comment-freelancr';
import {UserFreelancrFreelancr, UserFreelancrFreelancrService} from '../../entities/user-freelancr-freelancr';

@Component({
    selector: 'jhi-project-info',
    templateUrl: './project-info.component.html',
    styleUrls: [
        'project-info.component.scss'
    ]
})
export class ProjectInfoComponent implements OnInit {
    currentPage = 'About';
    currentProject: any;
    goals: GoalFreelancr[];
    positions: PositionFreelancr[];
    fullName: any;
    projectAdmin: any;
    isUserAdmin: any;
    success: any;
    invalidDate: any;
    noGoals: any;
    goal: any;
    editGoal: any;
    currentGoalPosition: any;
    createGoal = true;
    gsuccess: any;
    maxGoals: any;
    minGoals: any;
    gsaved: any;
    closeResult: string;
    delGoal: any;
    delSuccess: any;
    searchPositions: any;
    searchSkills: any;
    position: any;
    maxSkills: any;
    isEq: any;
    maxPositions: any;
    currentPositionIndex: any;
    editPosition: any;
    createPosition = true;
    psuccess: any;
    psaved: any;
    delPos: any;
    minPositions: any;
    delSuccessPos: any;
    appPosition: any;
    applications: ApplicationFreelancr[];
    currentAccount: any;
    confUser: any;
    confPosition: any;
    confApp: ApplicationFreelancr;
    rejected: any;
    accepted: any;
    rejectMessage: any;
    newComment: CommentFreelancr;
    comments: CommentFreelancr[];
    amountError: any;
    appUsers: UserFreelancrFreelancr[];
    remUser: any;
    currentPos: any;
    removeMsg: any;

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectFreelancrService,
        private goalService: GoalFreelancrService,
        private positionService: PositionFreelancrService,
        private principal: Principal,
        private userService: UserService,
        private userFreelancrService: UserFreelancrFreelancrService,
        private modalService: NgbModal,
        private positionTypeService: PositionTypeFreelancrService,
        private skillTypeService: SkillTypeFreelancrService,
        private applicationService: ApplicationFreelancrService,
        private applicationMessageService: ApplicationMessageFreelancrService,
        private messageService: MessageFreelancrService,
        private commentService: CommentFreelancrService,
        private router: Router
    ) {
        this.currentProject = {};
        this.goals = [];
        this.positions = [];
        this.projectAdmin = {};
        this.goal = {};
        this.delGoal = {};
        this.searchPositions = [];
        this.searchSkills = [];
        this.position = {};
        this.position.skills = [];
        this.delPos = {};
        this.appPosition = {};
        this.currentAccount = {};
        this.applications = [];
        this.newComment = {};
        this.comments = [];
        this.appUsers = [];
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadProject(params['id']);
        });

    }

    loadProject(id) {
        this.projectService.find(id)
            .subscribe((res) => {
                this.currentProject = res.body;
                this.loadGoals();
                this.loadPositions();
                this.loadAdmin();
                this.principal.identity().then((account) => {
                    this.isUserAdmin = account.id === this.currentProject.userId;
                    this.currentAccount = account;

                });
                this.loadApplications();
                this.loadComments();
            });
    }

    loadAdmin() {
        this.userService.find(this.currentProject.userLogin)
            .subscribe((res) => {
                this.projectAdmin = res.body;
                this.fullName = ' ' + this.projectAdmin.firstName + ' ' + this.projectAdmin.lastName;
            });
    }

    loadGoals() {
        this.goalService.findByProject(this.currentProject.id)
            .subscribe((res) => {
                this.goals = res.body;
            });

    }

    loadPositions() {
        this.positionService.findByProject(this.currentProject.id)
            .subscribe((res) => {
                this.positions = res.body;
            });
    }

    loadApplications() {
        if (!this.isUserAdmin) {
            this.applicationService.findByProject(this.currentProject.id)
                .subscribe((res) => {
                    this.applications = res.body;
                    this.loadAppMessages();
                });
        }
    }

    loadAppMessages() {
        this.applications.forEach((app) => {
            this.applicationMessageService.findByApplication(app.id)
                .subscribe((res) => {
                    app.messages = res.body;
                    this.userFreelancrService.find(app.userId)
                        .subscribe((userRes) => {
                            this.appUsers.push(userRes.body);
                        });
                });
        });
    }

    getResume(id) {
        if (this.appUsers.length > 0) {
            return this.appUsers.find((u) => u.id === id).resumeLink;
        }
    }

    getPersonal(id) {
        if (this.appUsers.length > 0) {
            return this.appUsers.find((u) => u.id === id).personalLink;

        }
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    updateBasic() {
        this.removeAllNotifications();
        if (!this.validateDate()) {
            this.invalidDate = true;
        } else {
            this.projectService.update(this.currentProject)
                .subscribe(() => {
                    this.success = true;
                });
        }

    }

    validateDate() {
        const d1 = new Date(this.currentProject.deadline);
        const d2 = new Date();
        d2.setDate(d2.getDate() + 7);
        return d1 > d2;
    }

    isEmpty(array) {
        return array.length === 0;
    }

    applyChanges() {
        this.createGoal = true;
        this.removeAllNotifications();
        if (this.currentGoalPosition > -1) {
            this.goalService.update(this.goal)
                .subscribe(() => {
                    this.goals[this.currentGoalPosition] = this.goal;
                    this.gsuccess = true;
                    this.goal = {};
                    this.editGoal = false;
                });
        }
    }

    editAssign(g) {
        this.goal = g;
        this.currentGoalPosition = this.goals.indexOf(this.goal, 0);
        this.goal = Object.assign({}, this.goal, g);
        this.editGoal = true;
        this.createGoal = false;
    }

    saveGoal() {
        this.removeAllNotifications();
        if (this.goals.length === 4) {
            this.maxGoals = true;
        } else {
            this.goal.projectId = this.currentProject.id;
            this.goalService.create(this.goal)
                .subscribe((res) => {
                    this.goals.push(res.body);
                    this.gsaved = true;
                    this.maxGoals = false;
                    this.goal = {};
                });
        }
    }

    open(content, goal) {
        this.delGoal = goal;
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openAccept(content, app) {
        this.confUser = app.userLogin;
        this.confPosition = app.positionTitle;
        this.confApp = app;
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openPosition(content, position) {
        this.delPos = position;
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

    deleteGoal(goal) {
        this.removeAllNotifications();
        if (this.goals.length === 1) {
            this.minGoals = true;
        } else {
            this.goalService.delete(goal.id)
                .subscribe(() => {
                    this.removeGoal(goal);
                    this.delSuccess = true;
                    this.delGoal = {};
                });
        }
    }

    deletePosition(position) {
        this.removeAllNotifications();
        if (this.positions.length === 1) {
            this.minPositions = true;
        } else {
            this.positionService.delete(position.id)
                .subscribe(() => {
                    this.removePosition(position);
                    this.delSuccessPos = true;
                    this.delPos = {};
                });
        }
    }

    resetPosition() {
        this.position = {};
        this.position.skills = [];
        this.editPosition = false;
        this.createPosition = true;
    }

    removeGoal(rGoal) {
        const goalIndex = this.goals.indexOf(rGoal, 0);
        if (goalIndex > -1) {
            this.goals.splice(goalIndex, 1);
            this.maxGoals = false;
        }
    }

    removePosition(pos: PositionFreelancr) {
        const positionIndex = this.positions.indexOf(pos, 0);
        if (positionIndex > -1) {
            this.positions.splice(positionIndex, 1);
            this.maxPositions = false;
        }
    }

    editAssignPosition(p) {
        this.position = p;
        this.currentPositionIndex = this.positions.indexOf(this.position, 0);
        this.position.skills = Object.assign([], this.position.skills, p.skills);
        this.position = Object.assign({}, this.position, p);
        this.editPosition = true;
        this.createPosition = false;
    }

    removeAllNotifications() {
        this.success = false;
        this.invalidDate = false;
        this.noGoals = false;
        this.gsuccess = false;
        this.maxGoals = false;
        this.minGoals = false;
        this.gsaved = false;
        this.delSuccess = false;
        this.maxSkills = false;
        this.isEq = false;
        this.psaved = false;
        this.psuccess = false;
        this.maxPositions = false;
        this.delSuccessPos = false;
        this.minPositions = false;
        this.amountError = false;
    }

    searchPosition(name) {
        this.positionTypeService.findByName(name)
            .pipe(debounceTime(300))
            .subscribe((typeReponse: HttpResponse<PositionTypeFreelancr[]>) => {
                this.searchPositions = typeReponse.body;
            }, () => {
                this.searchPositions = null;
            });
    }

    searchSkillTypes(name) {
        this.skillTypeService.findByName(name)
            .pipe(debounceTime(300))
            .subscribe((typeReponse: HttpResponse<SkillTypeFreelancr[]>) => {
                this.searchSkills = typeReponse.body;
            }, () => {
                this.searchSkills = null;
            });
    }

    applyChangesPosition() {
        this.removeAllNotifications();
        this.createPosition = true;
        if (this.position.quantity < this.position.hiredUsers.length) {
            this.amountError = true;
        } else {
            if (this.currentPositionIndex > -1) {
                this.positionService.update(this.position)
                    .subscribe(() => {
                        this.positions[this.currentPositionIndex] = this.position;
                        this.psuccess = true;
                        this.position = {};
                        this.position.skills = [];
                        this.editPosition = false;
                    });
            }
        }
    }

    assignPositionType(pos: PositionTypeFreelancr) {
        this.position.title = pos.name;
        this.position.typeName = pos.name;
        this.position.typeId = pos.id;
        this.searchPositions = [];
    }

    assignPosSkill(skill: SkillTypeFreelancr) {
        if (this.position.skills.length === 10) {
            this.maxSkills = true;
        } else {
            if (!this.checkReapeatedSkill(skill)) {
                this.position.skills.push(skill);
                this.searchSkills = [];
                this.maxSkills = false;
                this.isEq = null;
            } else {
                this.isEq = skill.name;
            }
        }
    }

    removeSkill(skill: SkillTypeFreelancr) {
        const skillIndex = this.position.skills.indexOf(skill, 0);
        if (skillIndex > -1) {
            this.position.skills.splice(skillIndex, 1);
        }
    }

    savePosition() {
        this.removeAllNotifications();
        if (this.positions.length === 5) {
            this.maxPositions = true;
        } else {
            this.position.projectId = this.currentProject.id;
            this.positionService.create(this.position)
                .subscribe((res) => {
                    this.positions.push(res.body);
                    this.psaved = true;
                    this.maxPositions = false;
                    this.position = {};
                    this.position.skills = [];
                });
        }
    }

    checkReapeatedSkill(skill: SkillTypeFreelancr) {
        let auxSkills: SkillTypeFreelancr[];
        auxSkills = this.position.skills;
        if (auxSkills.filter((sk) => sk.name === skill.name)[0]) {
            return true;
        } else {
            return false;
        }
    }

    getCount() {
        let openPos = 0;
        for (const pos of this.positions) {
            openPos += pos.quantity - pos.hiredUsers.length;
        }
        return openPos;
    }

    checkIfApplied(id) {
        let checkApps: ApplicationFreelancr[];
        checkApps = this.applications.filter((app) => app.positionId === id);
        if (checkApps) {
            for (const app of checkApps) {
                if (app.userId === this.currentAccount.id) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    declineApp() {
        this.accepted = false;
        this.rejected = false;
        this.confApp.status = ApplicationStatus.REJECTED;
        const msg = new MessageFreelancr;
        const key = this.currentAccount.langKey;
        if (key === 'en') {
            msg.topic = 'Application rejected';
            msg.message = 'Sorry your application to the position ' + this.confApp.positionTitle + ' has been rejected. \n Reason: ';
        } else {
            msg.topic = 'Application rechazada';
            msg.message = 'Lo sentimos tu aplicación al puesto ' + this.confApp.positionTitle + ' ha sido rechazada. \n Razón: ';
        }

        msg.message += this.rejectMessage;

        msg.receiverId = this.confApp.userId;
        msg.senderId = 4;
        this.applicationService.update(this.confApp)
            .subscribe(() => {
                this.removeApp(this.confApp);
                this.messageService.create(msg)
                    .subscribe(() => {
                        this.deleteApp(this.confApp);
                        this.rejected = true;
                    });
            });
    }

    acceptApp() {
        this.accepted = false;
        this.rejected = false;
        const pos = this.positions.filter((pstn) => pstn.id === this.confApp.positionId)[0];
        this.confApp.status = ApplicationStatus.ACCEPTED;
        this.userService.find(this.confApp.userLogin)
            .subscribe((res) => {
                pos.hiredUsers.push(res.body);
                this.positionService.update(pos)
                    .subscribe();
            });
        const msg = new MessageFreelancr;
        const key = this.currentAccount.langKey;
        if (key === 'en') {
            msg.topic = 'Application accepted!';
            msg.message = 'Congratulations your application to the position ' + this.confApp.positionTitle + ' has been accepted, you will be notified when the project starts.';
        } else {
            msg.topic = 'Aplicación aceptada!';
            msg.message = 'Felicidades tu aplicación al puesto ' + this.confApp.positionTitle + ' ha sido aceptada, te notificaremos cuando empieze el proyecto.';
        }

        msg.receiverId = this.confApp.userId;
        msg.senderId = 4;
        this.applicationService.update(this.confApp)
            .subscribe(() => {
                this.removeApp(this.confApp);
                this.messageService.create(msg)
                    .subscribe(() => {
                        this.accepted = true;
                    });
            });
    }

    deleteApp(app) {
        this.applicationMessageService.delete(app.messages[0].id)
            .subscribe(() => {
                this.applicationService.delete(app.id)
                    .subscribe();
            });
    }

    removeApp(app: ApplicationFreelancr) {
        const skillIndex = this.applications.indexOf(app, 0);
        if (skillIndex > -1) {
            this.applications.splice(skillIndex, 1);
        }
    }

    sendComment() {
        this.newComment.userId = this.currentAccount.id;
        this.newComment.userLogin = this.currentAccount.login;
        this.newComment.timestamp = new Date();
        this.newComment.projectId = this.currentProject.id;
        this.newComment.projectTitle = this.currentProject.title;
        this.commentService.create(this.newComment)
            .subscribe(() => {
                this.success = true;
                this.newComment = {};
                this.loadComments();
            });
    }

    loadComments() {
        this.commentService.findCommentByProjectId(this.currentProject.id)
            .subscribe((res) => {
                this.comments = res.body;
            });
    }

    openRemove(content, user, position) {
        this.remUser = user;
        this.currentPos = position;
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    removeHired() {
        const msg = new MessageFreelancr;
        const key = this.remUser.langKey;
        if (key === 'en') {
            msg.topic = 'You have been removed from a position';
            msg.message = 'Unfortunately you have been removed from the position ' + this.currentPos.title + '\n Reason: ';
        } else {
            msg.topic = 'Has sido removido de una posición';
            msg.message = 'Desafortunadamente has sido removido de la posición ' + this.currentPos.title + '\n Razón: ';
        }
        msg.message += this.removeMsg;
        msg.receiverId = this.remUser.id;
        msg.senderId = 4;
        const hiredIndex = this.currentPos.hiredUsers.indexOf(this.remUser, 0);
        if (hiredIndex > -1) {
            this.currentPos.hiredUsers.splice(hiredIndex, 1);
        }
        this.positionService.update(this.currentPos)
            .subscribe(() => {
                this.messageService.create(msg)
                    .subscribe(() => {
                        this.accepted = true;
                    });
            });
    }

    getAvailable(position) {
        return position.quantity - position.hiredUsers.length;
    }

    getAmount(id) {
        return this.getAvailable(this.positions.filter((pos) => pos.id === id)[0]);
    }

    redirectUserProfile(id) {
        this.router.navigate(['public-profile/' + id]);
    }
}
