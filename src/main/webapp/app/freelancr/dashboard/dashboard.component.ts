import { Component, OnInit } from '@angular/core';
import {Account, Principal, UserService} from '../../shared';
import { ProjectFreelancrService} from '../../entities/project-freelancr';
import { HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { MessageFreelancrService } from '../../entities/message-freelancr';
import {CardFreelancrService} from '../../entities/card-freelancr';
import {FeedbackFreelancrService} from '../../entities/feedback-freelancr';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
      'dashboard.scss'
  ]
})
export class DashboardComponent implements OnInit {
    account: Account;
    currentProjects: any[];
    yourProjects: any[];
    projectsAvailable: number;
    userMessages: number;
    userAssinedCards: number;
    userFeedbacks: number;

    constructor(private principal: Principal,
                private projectService: ProjectFreelancrService,
                private jhiAlertService: JhiAlertService,
                private messageService: MessageFreelancrService,
                private cardService: CardFreelancrService,
                private feedbackService: FeedbackFreelancrService,
                private userService: UserService) {
        this.projectsAvailable = 0;
        this.userMessages = 0;
        this.userAssinedCards = 0;
        this.userFeedbacks = 0;
    }

    ngOnInit() {
      this.principal.identity().then((account) => {
          this.account = account;
          this.loadUserStats();
      });
    }

    private loadUserStats(): void {
        this.projectService.findByUser().subscribe((res) => {
            this.yourProjects = res.body;
        }, (res: HttpErrorResponse) => this.onError(res.error));

        this.projectService.findActiveMemberProjects().subscribe((res) => {
            this.currentProjects = res.body;
            this.projectsAvailable = this.currentProjects.length;
        }, (res: HttpErrorResponse) => this.onError(res.error));

        this.messageService.findMessageByCurrentUserRecieved().subscribe(
            (res) => {
                this.userMessages = res.body.length;
            }, (res: HttpErrorResponse) => this.onError(res.error)
        );
        this.cardService.getAssigned()
            .subscribe( (res) => {
               this.userAssinedCards = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.error));
        this.userService.find(this.account.login)
            .subscribe( (res) => {
                this.feedbackService.findByUserId(res.body.id)
                    .subscribe( (res2) => {
                       this.userFeedbacks = res2.body.length;
                    });
            });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
