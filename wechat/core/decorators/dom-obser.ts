import { Observable, Observer } from 'rxjs';
export function createDomObser(target: any = document): Observable<{ mutations: MutationRecord[], observer: MutationObserver }> {
    return Observable.create((obser: Observer<{ mutations: MutationRecord[], observer: MutationObserver }>) => {
        const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
            obser.next({
                mutations,
                observer
            });
        });
        observer.observe(target, {
            attributeFilter: [],
            attributeOldValue: true,
            attributes: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true
        });
    });
}
