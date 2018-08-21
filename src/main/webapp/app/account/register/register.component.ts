import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { Register } from './register.service';
import {
    EMAIL_ALREADY_USED_TYPE,
    LOGIN_ALREADY_USED_TYPE,
    GITHUB_INVALID,
    User,
    UserService
} from '../../shared';
import {
    UserFreelancrFreelancr,
    UserFreelancrFreelancrService,
    UserStatus
} from '../../entities/user-freelancr-freelancr';

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    freelancrAccount: UserFreelancrFreelancr;
    success: boolean;
    gitinvalid: string;
    invalidDate: string;
    under15: string;
    createdUser: User;
    modalRef: NgbModalRef;
    birthday: string;
    constructor(
        private languageService: JhiLanguageService,
        private registerService: Register,
        private elementRef: ElementRef,
        private userService: UserService,
        private freelancrService: UserFreelancrFreelancrService,
        private renderer: Renderer
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        this.freelancrAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }
    getAge(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    checkValidDate(dateString) {
        const today = new Date();
        const userDate = new Date(dateString);
        if (today.getTime() < userDate.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    checkUnder15(dateString) {
        const userAge = this.getAge(dateString);
        if (userAge < 15) {
            return true;
        } else {
            return false;
        }
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        }else if (this.checkValidDate(this.birthday)) {
            this.invalidDate = 'ERROR';
        }else if (this.checkUnder15(this.birthday)) {
            this.under15 = 'ERROR';
        } else {
            this.invalidDate = null;
            this.under15 = null;
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.gitinvalid = null;
            this.languageService.getCurrent().then((key) => {
                this.registerAccount.langKey = key;
                this.registerAccount.imageUrl = 'http://www.skywardimaging.com/wp-content/uploads/2015/11/default-user-image.png';
                this.registerService.save(this.registerAccount).subscribe(() => {
                    this.userService.find(this.registerAccount.login)
                        .subscribe((userResponse: HttpResponse<User>) => {
                            this.createFreelancrUser(userResponse.body);
                        }, (response) => this.processError(response));
                }, (response) => this.processError(response));
            });

        }
    }

    private createFreelancrUser(user) {
        this.createdUser = user;
        this.freelancrAccount.userId = this.createdUser.id;
        this.freelancrAccount.birthDate = new Date(this.birthday);
        this.freelancrAccount.gitUser = this.createdUser.login;
        this.freelancrAccount.status = UserStatus.ACTIVE;
        this.freelancrService.create(this.freelancrAccount).subscribe( () => {
            this.success = true;
        }, (response) => console.log(response));

    }
    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        }else if (response.status === 400 && response.error.type === GITHUB_INVALID) {
            this.gitinvalid = 'ERROR';
        }else {
            this.error = 'ERROR';
        }
    }
}
