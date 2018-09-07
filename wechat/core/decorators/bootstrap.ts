import { switchMap, concatMap } from 'rxjs/operators';
import { from, fromEvent, forkJoin, EMPTY, Observable } from 'rxjs';
import { componentMap } from './component';
const icomponents$: any[] = [];

function defineComponent(key: string, target: any): Observable<any> {
    if (customElements.get(key)) {
        console.error(`${key} 已存在`);
        return EMPTY;
    }
    customElements.define(key, target);
    return from(customElements.whenDefined(key))
}

export function appBootstrap(): Observable<any> {
    componentMap.forEach((target, key) => {
        icomponents$.push(
            defineComponent(key, target)
        );
    })
    return fromEvent(window, 'DOMContentLoaded').pipe(
        switchMap(() => {
            return forkJoin(
                ...icomponents$
            );
        }),
        concatMap(res => from(res))
    );
}
