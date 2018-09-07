import { Observable, of, animationFrameScheduler, from } from 'rxjs';
import { IComponent, CoreComponent } from '../../core';
import "./index.scss";
import { concatMap } from 'rxjs/operators';
import { domCreater } from '../../core/utils/dom-creater';
@IComponent({
    selector: "app-test"
})
export class TestElement extends CoreComponent {
    domFlow: any[] = [
        ['apptest2', '哈哈哈'],
        ['apptest2', '哈哈哈']
    ];
    constructor() {
        super();
        domCreater('app-test[href=#].test.test2#test2');
        // this.render().subscribe(res => this.appendChild(this.createElement(...res)));
    }
    render(): Observable<any> {
        return from(this.domFlow, animationFrameScheduler).pipe(
            concatMap(res => {
                return of(res);
            })
        );
    }

    createElement(...args: any[]) {
        // return createElement(...args)
    }
}
