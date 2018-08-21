import { Component, OnInit } from '@angular/core';
import {CommentFreelancr, CommentFreelancrService} from '../../entities/comment-freelancr';
import {ProjectFreelancr} from '../../entities/project-freelancr';
import {Principal} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'jhi-project-comment',
  templateUrl: './project-comment.component.html',
  styles: []
})
export class ProjectCommentComponent implements OnInit {
    newComment: CommentFreelancr;
    comments: CommentFreelancr[];
    project: ProjectFreelancr;
    currentUserLogged: any;
    success: boolean;
    projectId: number;
    eventSubscriber: Subscription;

    constructor(
        private commentService: CommentFreelancrService,
        private principal: Principal,
    ) {
        this.newComment = {};
        this.comments = [];
        this.success = false;
    }

    ngOnInit() {
        this.principal.identity().then( (account) => {
            this.currentUserLogged = account;
        });
        this.projectId = this.project.id;
        this.loadComments();
    }

    loadComments() {
        this.commentService.findCommentByProjectId(this.projectId)
            .subscribe( (res) => {
                this.comments = res.body;
            });
    }
    sendComment() {
        this.newComment.userId = this.currentUserLogged.id;
        this.newComment.userLogin = this.currentUserLogged.login;
        this.newComment.timestamp = new Date();
        this.newComment.projectId = this.project.id;
        this.newComment.projectTitle = this.project.title;
        this.commentService.create(this.newComment)
            .subscribe( () => {
                this.success = true;
            });
    }
}
