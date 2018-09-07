import { Subject } from 'rxjs';
export class DomFactory {
    constructor(
        private dom: HTMLElement,
        private obj: Subject<any>
    ) { }
}
