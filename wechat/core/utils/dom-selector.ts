import { concatMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { match } from 'ramda';
export const idMatch = match(/#([a-z]+[a-z0-9-_]*)/gi);
export function selectElement(selector: string) {
    return of(selector).pipe(
        // 分流 #开头 .开头
        // concatMap(res => {

        // })
    );
}

export function ContentChild(selector: string) {
    return (target: HTMLHtmlElement) => {
        target.querySelector(selector);
    }
}
export function ContentChildren(selector: string) {
    return (target: HTMLHtmlElement) => { }
}
export function ViewChild(selector: string) {
    return (target: HTMLHtmlElement) => { }
}
export function ViewChildren(selector: string) {
    return (target: HTMLHtmlElement) => { }
}
