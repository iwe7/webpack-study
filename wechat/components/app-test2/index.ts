import { Observable, of, animationFrameScheduler, from } from 'rxjs';
import { IComponent, CoreComponent } from '../../core';
import "./index.scss";
import { concatMap } from 'rxjs/operators';
import createElement = require('dom-create-element-query-selector');
@IComponent({
    selector: "app-test2"
})
export class Test2Element extends CoreComponent {
    domFlow: any[] = [
        ['div#test-div', '哈哈哈'],
        ['div#test-div', '哈哈哈']
    ];
    constructor() {
        super();
        this.render().subscribe(res => this.appendChild(this.createElement(...res)));
    }
    render(): Observable<any> {
        return from(this.domFlow, animationFrameScheduler).pipe(
            concatMap(res => {
                return of(res);
            })
        );
    }

    createElement(...args: any[]) {
        return createElement(...args)
    }
}
