import { from, fromEvent, Observable, BehaviorSubject, of } from 'rxjs';
import { mergeMap, map, concatMap, tap, take } from 'rxjs/operators';
import { createDomObser, getKeys } from './decorators';
export abstract class CoreComponent<P = any, S = any> extends HTMLElement {
    public props: BehaviorSubject<P> = new BehaviorSubject({} as any);
    public state: BehaviorSubject<S> = new BehaviorSubject({} as any);
    public onInit: Observable<any>;
    constructor() {
        super();
        this.onInit = createDomObser(this).pipe(
            take(1)
        );
        createDomObser(this).pipe(
            map(res => res.mutations),
            concatMap((res: MutationRecord[]) => {
                return from(res);
            }),
            concatMap((res: MutationRecord) => {
                return of({
                    add: res.addedNodes.length > 0,
                    remove: res.removedNodes.length > 0
                });
            })
        ).subscribe(() => {
            getKeys(this);
        })
    }
    fromEvents<K extends keyof HTMLElementEventMap>(events: K[]): Observable<any> {
        return from(events).pipe(
            mergeMap((event: K) => {
                return this.fromEvent<K>(event)
            })
        )
    }
    fromEvent<K extends keyof HTMLElementEventMap>(event: K): Observable<HTMLElementEventMap[K]> {
        return fromEvent<HTMLElementEventMap[K]>(this, event);
    }
    abstract render(): void;
    _render(): Observable<any> {
        return of(null).pipe(
            tap(() => {
                this.render()
            })
        )
    }
    ngOnChanges(): void { }
    // dom ready
    ngDocheck(): void { }
    ngOnDestory(): void { }
    ngAfterContentInit(): void { }
    ngAfterContentChecked(): void { }
    ngAfterViewInit(): void { }
    ngAfterViewChecked(): void { }
}
