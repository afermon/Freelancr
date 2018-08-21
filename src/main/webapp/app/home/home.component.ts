import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

import '../../../../../node_modules/granim/dist/granim.min';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    granimCa: any;

    constructor(
        private principal: Principal,
        private router: Router,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });

        if (this.principal.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        }

        this.registerAuthenticationSuccess();
        this.initiallizeGranim();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    initiallizeGranim() {
        this.granimCa = new window['Granim']({
            element: '#canvas-basic',
            name: 'basic-gradient',
            direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
            opacity: [1, 1],
            isPausedWhenNotInView: true,
            image: {
                source: '/content/images/landing-bg.jpg',
                blendingMode: 'multiply'
            },
            states: {
                'default-state': {
                    gradients: [
                        ['#51cbce', '#51cbce'],
                        ['#51cbce', '#c178c1'],
                        ['#c178c1', '#f5593d'],
                        ['#f5593d', '#fbc658'],
                        ['#fbc658', '#51bcda'],
                        ['#51bcda', '#51cbce']
                    ],
                    transitionSpeed: 10000
                }
            }
        });
    }
}
