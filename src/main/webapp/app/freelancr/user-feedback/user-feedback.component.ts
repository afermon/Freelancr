import { Component, OnInit, Input } from '@angular/core';
import {FeedbackFreelancr} from '../../entities/feedback-freelancr';

@Component({
  selector: 'jhi-user-feedback',
  templateUrl: './user-feedback.component.html',
  styles: []
})
export class UserFeedbackComponent implements OnInit {
    @Input() feedbacks: FeedbackFreelancr[];
    constructor() {
        this.feedbacks = [];
    }

    ngOnInit() {
    }

}
