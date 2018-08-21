import {Component, OnInit} from '@angular/core';
import {ProjectFreelancr, ProjectFreelancrService, ProjectStatus} from '../../entities/project-freelancr';
import {GoalFreelancr, GoalFreelancrService} from '../../entities/goal-freelancr';
import {SkillTypeFreelancr, SkillTypeFreelancrService} from '../../entities/skill-type-freelancr';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';
import {SkillFreelancr} from '../../entities/skill-freelancr';
import {PositionTypeFreelancr, PositionTypeFreelancrService} from '../../entities/position-type-freelancr';
import {debounceTime} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {Principal} from '../../shared';
import {Router} from '@angular/router';

@Component({
    selector: 'jhi-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: [
        'new-project.component.scss'
    ]
})
export class NewProjectComponent implements OnInit {

    project: ProjectFreelancr;
    currentAccount: any;
    error: any;
    goal: GoalFreelancr;
    goals: GoalFreelancr [];
    maxGoals: any;
    positions: PositionFreelancr[];
    position: PositionFreelancr;
    searchPositions: PositionTypeFreelancr[];
    searchSkills: SkillTypeFreelancr[];
    addedSkills: SkillFreelancr[];
    selectedSkill: SkillFreelancr;
    maxSkills = false;
    isEq: any;
    maxPositions: any;
    invalidDate: any;
    noGoals: any;
    noPositions: any;
    basicstep: any;
    objectivestep: any;
    positionstep: any;
    successstep: any;
    page: any;

    constructor(
        private projectService: ProjectFreelancrService,
        private skillTypeService: SkillTypeFreelancrService,
        private positionTypeService: PositionTypeFreelancrService,
        private goalService: GoalFreelancrService,
        private positionService: PositionFreelancrService,
        private principal: Principal,
        private router: Router
    ) {
        this.project = {};
        this.currentAccount = {};
        this.goal = {};
        this.goals = [];
        this.maxGoals = false;
        this.positions = [];
        this.position = {};
        this.addedSkills = [];
        this.selectedSkill = {};
        this.position.skills = [];
        this.basicstep = true;
        this.objectivestep = false;
        this.positionstep = false;
        this.successstep = false;
        this.page = 'Basic';

    }

    ngOnInit() {
        this.error = false;
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    assignGoal() {
        if (this.goals.length < 4) {
            let newGoal: any;
            newGoal = this.goal;
            this.goal = {};
            this.goals.push(newGoal);
            this.maxGoals = false;
        } else {
            this.maxGoals = true;
        }
    }

    removeGoal(rGoal) {
        const goalIndex = this.goals.indexOf(rGoal, 0);
        if (goalIndex > -1) {
            this.goals.splice(goalIndex, 1);
            this.maxGoals = false;
        }
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

    assignPosition() {
        if (this.positions.length === 5) {
            this.maxPositions = true;
        } else {
            const newposition = this.position;
            this.positions.push(newposition);
            this.position = {};
            this.position.skills = [];
            this.searchSkills = [];
            this.maxSkills = false;
            this.isEq = null;
        }

    }

    register() {
        this.invalidDate = false;
        this.noGoals = false;
        this.noPositions = false;
        if (!this.validateDate()) {
            this.invalidDate = true;
        } else if (this.goals.length === 0) {
            this.noGoals = true;
        } else if (this.positions.length === 0) {
            this.noPositions = true;
        } else {
            this.project.status = ProjectStatus.PUBLISHED;
            this.project.userId = this.currentAccount.id;
            this.projectService.create(this.project)
                .subscribe((res) => {
                    this.createGoals(res.body.id);
                    this.createPosition(res.body.id);
                }, () => {
                    this.error = true;
                });
        }
    }

    createGoals(id) {
        this.goals.forEach((goal) => {
            goal.projectId = id;
            this.goalService.create(goal)
                .subscribe(() => {
                }, (error) => {
                });
        });
    }

    createPosition(id) {
        this.positions.forEach((pos) => {
            pos.projectId = id;
            this.positionService.create(pos)
                .subscribe(() => {
                    this.router.navigate(['/project-info/' + id]);
                }, (error) => {
                });
        });
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

    removePosition(pos: PositionFreelancr) {
        const positionIndex = this.positions.indexOf(pos, 0);
        if (positionIndex > -1) {
            this.positions.splice(positionIndex, 1);
            this.maxPositions = false;
        }
    }

    validateDate() {
        const d1 = new Date(this.project.deadline);
        const d2 = new Date();
        d2.setDate(d2.getDate() + 7);
        return d1 > d2;
    }

    isEmpty(array) {
        return array.length === 0;
    }

    nextBasic() {
        this.invalidDate = false;
        if (!this.validateDate()) {
            this.invalidDate = true;
        }else {
            this.basicstep = false;
            this.objectivestep = true;
            this.page = 'Objectives';
        }
    }

    nextObjective() {
        this.noGoals = false;
        if (this.goals.length === 0) {
            this.noGoals = true;
        }else {
            this.objectivestep = false;
            this.positionstep = true;
            this.page = 'Positions';
        }
    }

    nextPosition() {
        this.noPositions = false;
        if (this.positions.length === 0) {
            this.noPositions = true;
        }else {
            this.positionstep = false;
            this.successstep = true;
            this.page = 'Confirmation';
        }
    }

}
