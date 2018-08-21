import { Component } from '@angular/core';
import { VERSION } from '../../app.constants';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: [
        'footer.scss'
    ]
})
export class FooterComponent {
    currentDate: Date = new Date();
    version: string;

    constructor() {
        this.version = VERSION ? 'v' + VERSION : '';
    }
}
