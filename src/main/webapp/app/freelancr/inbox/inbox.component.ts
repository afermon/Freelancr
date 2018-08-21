import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { HttpResponse} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import {MessageFreelancr, MessageStatus} from '../../entities/message-freelancr/message-freelancr.model';
import {MessageFreelancrService} from '../../entities/message-freelancr';

@Component({
  selector: 'jhi-inbox',
  templateUrl: './inbox.component.html',
  styles: []
})
export class InboxComponent implements OnInit {
    closeResult: string;
    currentAccount: any;
    messages: MessageFreelancr[];
    message: MessageFreelancr;
    newMessage: MessageFreelancr;
    eventSubscriber: Subscription;
    indexMessageList: number;
    index: number;
    messageReply: MessageFreelancr;
    text: string;
    constructor(
        private modalService: NgbModal,
        private messageService: MessageFreelancrService,
        private eventManager: JhiEventManager
    ) {
        this.newMessage = {};
        this.newMessage.receiverLogin = '';
        this.messages = [];
        this.index = -1;
        this.messageReply = {};
        this.messageReply.senderLogin = '';
        this.newMessage = {};
    }

    loadAllMessagesByReceiver() {
        this.indexMessageList = 0;
        this.messageService.findMessageByCurrentUserRecieved().subscribe(
            (res: HttpResponse<MessageFreelancr[]>) => {
                this.messages = res.body;
            }
        );
    }

    loadAllMessagesSent() {
        this.indexMessageList = 1;
        this.messageService.findMessageByCurrentUserSent().subscribe(
            (res: HttpResponse<MessageFreelancr[]>) => {
                this.messages = res.body;
            }
        );
    }

    ngOnInit() {
        this.registerChangeInMessagesReceived();
        // this.registerChangeInMessagesSent();
        // this.registerChangeInMgs();
    }

    // compose popup start
    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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
            return  `with: ${reason}`;
        }
    }

    hideMessage() {
        this.message = null;
    }

    registerChangeInMessagesReceived() {
        this.eventSubscriber = this.eventManager.subscribe('messageListModification', () => this.eventTrigger());
    }

    // registerChangeInMessagesSent() {
    //     this.eventSubscriber = this.eventManager.subscribe('messageListModification', () => this.loadAllMessagesSent());
    // }
    //
    // registerChangeInMgs() {
    //     this.eventSubscriber = this.eventManager.subscribe('deleteMessageBody', () => this.hideMessage());
    // }

    eventTrigger() {
        if (this.indexMessageList === 0) {
            this.loadAllMessagesByReceiver();
            this.hideMessage();
        }
        if (this.indexMessageList === 1) {
            this.loadAllMessagesSent();
            this.hideMessage();
        }
    }
    getFormatedDate(pmsg) {
        const date = new Date(pmsg.timestamp.toString());
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return day + ' / ' + month + ' / ' + year;
    }

    showMessage(msg: MessageFreelancr) {
        this.message = msg;
        if (msg.replyId !== null) {
            this.messageService.find(this.message.replyId).subscribe((res: HttpResponse<MessageFreelancr>) => {
                    this.messageReply = res.body;
                }
            );
        }
    }

    updateStatus(msg: MessageFreelancr) {
        msg.status = MessageStatus.READ;
        this.messageService.update(msg).subscribe(() => {
                this.loadAllMessagesByReceiver();
            });
    }

    inboxMenu(number) {
        this.index = number;
    }

    openReply(content) {
        this.newMessage.receiverId = this.message.senderId;
        this.newMessage.receiverLogin = this.message.senderLogin;
        this.newMessage.topic = 'RE:' + this.message.topic;
        this.newMessage.senderLogin =  this.message.receiverLogin;
        this.newMessage.senderId = this.message.receiverId;
        this.newMessage.status = MessageStatus.NEW;
        this.newMessage.replyId = this.message.id;
        this.newMessage.timestamp = new Date();
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    cleanNewMessage() {
        this.newMessage = new MessageFreelancr();
        this.newMessage.senderLogin = '';
    }
    createReply() {
        this.messageService.create(this.newMessage)
            .subscribe(() => {
                this.newMessage = {};
                this.newMessage.senderLogin = '';
            });
    }

    keyDownFunction(event) {
        if (event.keyCode === 13) {
            this.newMessage.message = this.newMessage.message + '\u21B5';
            // this.text = this.newMessage.message.replace('\u21B5/g', '');
        }
    }

    refresh() {
        if (this.indexMessageList === 0) {
            this.loadAllMessagesByReceiver();

        }
    }
}
