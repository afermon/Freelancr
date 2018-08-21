import {Component, OnInit} from '@angular/core';
import {SkillFreelancr, SkillLevel} from '../../entities/skill-freelancr/skill-freelancr.model';
import {UserFreelancrFreelancr, UserFreelancrFreelancrService} from '../../entities/user-freelancr-freelancr';
import {Principal} from '../../shared';
import {SkillFreelancrService} from '../../entities/skill-freelancr';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {
    debounceTime
} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {SkillTypeFreelancr, SkillTypeFreelancrService} from '../../entities/skill-type-freelancr';

@Component({
    selector: 'jhi-skill-search',
    templateUrl: './skill-search.component.html',
    styleUrls: [
        'skill-search.scss'
    ]
})
export class SkillSearchComponent implements OnInit {

    searchSkills: any;
    freelancrAccount: any;
    currentUser: any;
    error: any;
    // Array keeps skills from the bd
    allSkills: SkillFreelancr[];
    selectedSkill: SkillFreelancr;
    addValue = '';
    isLimit = false;
    isEq = false;
    selectedSkillType = false;
    closeResult: any;
    delSkill: any;
    currentRate = 1;

    // Instances of the services are always in the constructor
    constructor(
        private principal: Principal,
        private freelancrService: UserFreelancrFreelancrService,
        private skillFreelancrService: SkillFreelancrService,
        private skillTypeService: SkillTypeFreelancrService,
        private modalService: NgbModal
    ) {
        this.freelancrAccount = {};
        this.currentUser = {};
        this.selectedSkill = {};

    }

    // This methods keeps the skills form the user currently logged in
    loadAllSkills() {
        this.skillFreelancrService.findByUserLogin()
            .subscribe((skillReponse: HttpResponse<SkillFreelancr[]>) => {
                this.allSkills = skillReponse.body;
            }, () => {
                this.allSkills = null;
            });
    }

    //  Load the user freelancr
    loadFreelancrUser() {
        this.freelancrService.findCurrentLogin()
            .subscribe((userResponse: HttpResponse<UserFreelancrFreelancr>) => {
                this.freelancrAccount = userResponse.body;
            });
    }

    ngOnInit() {
        this.loadFreelancrUser();
        // Load jhipster rUser();
        this.principal.identity().then((account) => {
            this.currentUser = account;
        });
        this.loadAllSkills();
    }

    search(skillName) {
        this.skillTypeService.findByName(skillName)
            .pipe(debounceTime(300) )
            .subscribe((typeReponse: HttpResponse<SkillTypeFreelancr[]>) => {
                // .body es para sacar el contenido del httpresponse
                this.searchSkills = typeReponse.body;
            }, () => {
                this.searchSkills = null;
            });
    }

    assignSkill(skill) {
        this.selectedSkill = new SkillFreelancr();
        this.selectedSkill.typeName = skill.name;
        this.selectedSkill.typeId = skill.id;
        this.selectedSkill.users = [];
        this.selectedSkillType = true;
        this.searchSkills = [];
    }

    addSkill() {
        this.toEnum();
        this.selectedSkill.users.push(this.currentUser);
        this.skillFreelancrService.create(this.selectedSkill)
            .subscribe(() => {
                this.loadAllSkills();
            });
        this.searchSkills = [];
        this.addValue = '';
        this.selectedSkill = {};
        this.selectedSkillType = false;
    }

    toEnum() {
        switch (this.currentRate) {
            case 1: {
                this.selectedSkill.level = SkillLevel.NO_EXPERIENCE;
                break;
            }
            case 2: {
                this.selectedSkill.level = SkillLevel.JUNIOR;
                break;
            }
            case 3: {
                this.selectedSkill.level = SkillLevel.MID_LEVEL;
                break;
            }
            case 4: {
                this.selectedSkill.level = SkillLevel.SENIOR;
                break;
            }
            case 5: {
                this.selectedSkill.level = SkillLevel.SME;
                break;
            }
        }
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

    deleteSkill(skill) {
        this.skillFreelancrService.delete(skill.id)
            .subscribe(() => {
                this.loadAllSkills();
            });
    }

    validateSkillLimit() {

        if (this.allSkills.length < 20) {
            this.addSkill();
        } else {
            this.isLimit = true;
        }

    }

    validateEqSkill() {
        let found: any;
        for (const arraySkill of this.allSkills) {
            if (arraySkill.typeName === this.selectedSkill.typeName) {
                found = true;
                break;
            } else {
                found = false;
            }
        }
        if (found) {
            this.isEq = true;
        } else {
            this.isEq = false;
            this.validateSkillLimit();
        }
    }

    open(content, skill) {
        this.delSkill = skill;
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

}
