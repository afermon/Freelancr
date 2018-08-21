import { Directive, OnInit, Input } from '@angular/core';

 @Directive({
     selector: '[jhiLoadScript]'
 })
export class LoadScriptDirective implements OnInit {

    @Input() script:  any;

    ngOnInit() {
        const node = document.createElement('script');
        node.src = this.script;
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
        console.log('Loaded: ' + this.script);
    }

}
