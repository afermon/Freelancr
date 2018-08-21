import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { Principal, AccountService, JhiLanguageHelper } from '../../shared';
import {UserFreelancrFreelancr} from '../../entities/user-freelancr-freelancr/user-freelancr-freelancr.model';
import {HttpResponse} from '@angular/common/http';
import {UserFreelancrFreelancrService} from '../../entities/user-freelancr-freelancr';
import {UploadFileService} from '../../freelancr/upload-file.service';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    freelancrAccount: UserFreelancrFreelancr;
    selectedPicture: FileList;
    selectedCV: FileList;
    cvActive: any;

    constructor(
        private account: AccountService,
        private freelancrService: UserFreelancrFreelancrService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private uploadService: UploadFileService

    ) {
        this.freelancrAccount = {};
    }

    ngOnInit() {
        this.loadFreelancrUser();
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }
    loadFreelancrUser() {
        this.freelancrService.findCurrentLogin()
            .subscribe( (userResponse: HttpResponse<UserFreelancrFreelancr>) => {
                this.freelancrAccount = userResponse.body;
                this.cvActive = !!(this.freelancrAccount.resumeLink);
            });
    }
    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });

            this.freelancrService.update(this.freelancrAccount)
                .subscribe( (responseFreelancr: HttpResponse<UserFreelancrFreelancr>) => {
                    this.freelancrAccount = responseFreelancr.body;
                });

            if (this.selectedPicture) {
                this.upload(this.selectedPicture, 'image', this.settingsAccount);
            }

            if (this.selectedCV) {
                this.upload(this.selectedCV, 'cv', this.freelancrAccount);
            }

            this.cvActive = true;

        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    upload(uploadedFile, fType, uAccount) {
        const file = uploadedFile.item(0);
        this.uploadService.uploadfile(file, uAccount, fType);
    }

    selectCV(event) {
        this.selectedCV = event.target.files;
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
