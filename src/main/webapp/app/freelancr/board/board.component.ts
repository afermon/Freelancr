import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CardFreelancr, CardFreelancrService, CardStatus} from '../../entities/card-freelancr';
import {DndDropEvent} from 'ngx-drag-drop';
import {ProjectFreelancr, ProjectFreelancrService} from '../../entities/project-freelancr';
import {Principal, UserService} from '../../shared';
import {ModalDismissReasons, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PositionFreelancr, PositionFreelancrService} from '../../entities/position-freelancr';

@Component({
    selector: 'jhi-board',
    templateUrl: './board.component.html',
    styleUrls: [
        'board.scss'
    ],
})
export class BoardComponent implements OnInit {

    newCards: CardFreelancr[];
    progressCards: CardFreelancr[];
    resolvedCards: CardFreelancr[];
    closedCards: CardFreelancr[];
    currentProject: ProjectFreelancr;
    allCards: any;
    isUserAdmin: any;
    currentAccount: any;
    notAdminMsg = false;
    closeResult: string;
    newCard: CardFreelancr;
    newCardUsers: any;
    positions: PositionFreelancr[];
    selectedCardIndex: any;
    isUserAllowed: any;
    selectedUser: any;
    createdCard = false;
    editedCard = false;
    deletedCard = false;
    delCard: any;
    minDate: any;
    draggable = {
        data: CardFreelancr,
        effectAllowed: 'all',
        disable: false,
        handle: false,
        dndAllowExternal: true
    };

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectFreelancrService,
        private cardService: CardFreelancrService,
        private principal: Principal,
        private modalService: NgbModal,
        private positionService: PositionFreelancrService,
        private router: Router,
        private userService: UserService
    ) {
        this.newCards = [];
        this.progressCards = [];
        this.resolvedCards = [];
        this.closedCards = [];
        this.allCards = [];
        this.currentProject = {};
        this.currentAccount = {};
        this.newCard = {};
        this.positions = [];
        this.newCardUsers = [];
        this.selectedUser = {};
        this.minDate = this.toNgbDate(new Date());
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadCards(params['id']);
            this.loadProject(params['id']);
        });

    }

    loadProject(id) {
        this.projectService.find(id)
            .subscribe((res) => {
                this.currentProject = res.body;
                this.principal.identity().then((account) => {
                    this.isUserAdmin = account.id === this.currentProject.userId;
                    this.currentAccount = account;
                    this.loadPositions(this.currentProject.id);

                });
            });
    }

    loadCards(id) {
        this.cardService.findByProject(id)
            .subscribe((res) => {
                this.allCards = res.body;
                this.sortCards(this.allCards);
            });
    }

    loadPositions(id) {
        this.positionService.findByProject(id)
            .subscribe((res) => {
                this.positions = res.body.filter((pos) => pos.hiredUsers.length > 0);
                this.checkUserAllowed();
            });
    }

    checkUserAllowed() {
        let found;
        if (this.isUserAdmin) {
            found = true;
        } else {
            for (const pos of this.positions) {
                for (const user of pos.hiredUsers) {
                    if (user.id === this.currentAccount.id) {
                        found = true;
                        break;
                    }
                }
            }
        }
        if (found) {
            this.isUserAllowed = true;
        } else {
            this.router.navigate(['/accessdenied']);
        }
    }

    clear() {
        this.newCard = {};
        this.selectedUser = {};
        this.newCardUsers = [];
    }

    save() {
        if (this.newCard.id !== undefined) {
            this.cardService.update(this.newCard)
                .subscribe((res) => {
                    this.setArray(res.body.status.toString())[this.selectedCardIndex] = res.body;
                    this.showInfoMessage(2);
                });
        } else {
            this.newCard.status = CardStatus.NEW;
            this.newCard.projectId = this.currentProject.id;
            this.newCard.userId = this.selectedUser.id;
            this.newCard.userLogin = this.selectedUser.login;
            this.cardService.create(this.newCard)
                .subscribe((res) => {
                    res.body.userLogin = this.selectedUser.login;
                    this.newCards.push(res.body);
                    this.newCard = {};
                    this.selectedUser = {};
                    this.newCardUsers = [];
                    this.showInfoMessage(1);
                });
        }
    }

    showInfoMessage(type) {
        const timeout = 3500;
        switch (type) {
            // Created
            case 1: {
                this.createdCard = true;
                setTimeout(() => {
                    this.createdCard = false;
                }, timeout);
                break;
            }
            // Edited
            case 2: {
                this.editedCard = true;
                setTimeout(() => {
                    this.editedCard = false;
                }, timeout);
                break;
            }
            // Deleted
            case 3: {
                this.deletedCard = true;
                setTimeout(() => {
                    this.deletedCard = false;
                }, timeout);
                break;
            }
        }
    }

    showUsers() {
        this.newCardUsers = this.positions.filter((pos) => pos.id === this.newCard.positionId)[0].hiredUsers;
    }

    open(content) {
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openDelete(content, card) {
        this.delCard = card;
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

    sortCards(cards: CardFreelancr[]) {

        for (const card of cards) {
            const status = card.status.toString();
            switch (status) {
                case 'NEW': {
                    this.newCards.push(card);
                    break;
                }
                case 'IN_PROGRESS': {
                    this.progressCards.push(card);
                    break;
                }
                case 'RESOLVED': {
                    this.resolvedCards.push(card);
                    break;
                }
                case 'CLOSED': {
                    this.closedCards.push(card);
                    break;
                }
            }
        }
    }

    onDropProgress(event: DndDropEvent) {
        const array = this.setArray(event.data.status.toString());
        let card = array.find((crd) => crd.id === event.data.id);
        const index = array.indexOf(card, 0);
        const copyCard = Object.assign({}, card);
        copyCard.deadline = new Date(card.deadline);
        const cardDate: NgbDateStruct = {
            day: card.deadline.getDate(),
            month: card.deadline.getMonth() + 1,
            year: card.deadline.getFullYear()
        };
        copyCard.deadline = cardDate;
        copyCard.status = CardStatus.IN_PROGRESS;
        this.cardService.update(copyCard)
            .subscribe((res) => {
                card = res.body;
                if (index > -1) {
                    array.splice(index, 1);
                    this.progressCards.push(card);
                }
            });
    }

    onDropNew(event: DndDropEvent) {
        const array = this.setArray(event.data.status.toString());
        let card = array.find((crd) => crd.id === event.data.id);
        const index = array.indexOf(card, 0);
        const copyCard = Object.assign({}, card);
        copyCard.deadline = new Date(card.deadline);
        const cardDate: NgbDateStruct = {
            day: card.deadline.getDate(),
            month: card.deadline.getMonth() + 1,
            year: card.deadline.getFullYear()
        };
        copyCard.deadline = cardDate;
        copyCard.status = CardStatus.NEW;
        this.cardService.update(copyCard)
            .subscribe((res) => {
                card = res.body;
                if (index > -1) {
                    array.splice(index, 1);
                    this.newCards.push(card);
                }
            });
    }

    onDropResolved(event: DndDropEvent) {
        const array = this.setArray(event.data.status.toString());
        let card = array.find((crd) => crd.id === event.data.id);
        const index = array.indexOf(card, 0);
        const copyCard = Object.assign({}, card);
        copyCard.deadline = new Date(card.deadline);
        const cardDate: NgbDateStruct = {
            day: card.deadline.getDate(),
            month: card.deadline.getMonth() + 1,
            year: card.deadline.getFullYear()
        };
        copyCard.deadline = cardDate;
        copyCard.status = CardStatus.RESOLVED;
        this.cardService.update(copyCard)
            .subscribe((res) => {
                card = res.body;
                if (index > -1) {
                    array.splice(index, 1);
                    this.resolvedCards.push(card);
                }
            });
    }

    onDropClosed(event: DndDropEvent) {
        const array = this.setArray(event.data.status.toString());
        let card = array.find((crd) => crd.id === event.data.id);
        const index = array.indexOf(card, 0);
        const copyCard = Object.assign({}, card);
        copyCard.deadline = new Date(card.deadline);
        const cardDate: NgbDateStruct = {
            day: card.deadline.getDate(),
            month: card.deadline.getMonth() + 1,
            year: card.deadline.getFullYear()
        };
        copyCard.deadline = cardDate;
        copyCard.status = CardStatus.CLOSED;
        this.cardService.update(copyCard)
            .subscribe((res) => {
                card = res.body;
                if (index > -1) {
                    array.splice(index, 1);
                    this.closedCards.push(card);
                }
            });
    }

    onDragover() {
        if (!this.isUserAdmin && !this.notAdminMsg) {
            this.notAdminMsg = true;
            setTimeout(() => {
                this.notAdminMsg = false;
            }, 5000);
        }
    }

    setArray(status: string) {
        let array: any;
        switch (status) {
            case 'NEW': {
                array = this.newCards;
                break;
            }
            case 'IN_PROGRESS': {
                array = this.progressCards;
                break;
            }
            case 'RESOLVED': {
                array = this.resolvedCards;
                break;
            }
            case 'CLOSED': {
                array = this.closedCards;
                break;
            }
        }

        return array;
    }

    assignCard(card: CardFreelancr) {
        this.selectedCardIndex = this.setArray(card.status.toString()).indexOf(card, 0);
        const copyCard = Object.assign({}, card);
        copyCard.deadline = this.toNgbDate(copyCard.deadline);
        this.newCard = copyCard;
        this.userService.find(this.newCard.userLogin)
            .subscribe((res) => {
                this.selectedUser = res.body;
            });
        this.showUsers();
    }

    deleteCard() {
        this.cardService.delete(this.delCard.id)
            .subscribe(() => {
                const array = this.setArray(this.delCard.status.toString());
                const index = array.indexOf(this.delCard, 0);
                if (index > -1) {
                    array.splice(index, 1);
                    this.showInfoMessage(3);
                    this.delCard = {};
                }
            });
    }

    toNgbDate(date) {
        return {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
    }

    checkExpired(date) {
        return Date.now() < date;
    }

    checkIfAllowed(card) {
        if (this.isUserAdmin) {
            return false;
        } else if (card.userId === this.currentAccount.id) {
            return false;
        } else {
            return true;
        }
    }
}
