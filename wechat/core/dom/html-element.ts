import { concatMap, switchMap, mergeMap, takeLast, tap, filter, concat, concatMapTo, zip, observeOn, map } from 'rxjs/operators';
import { Observable, Observer, of, from, animationFrameScheduler, asyncScheduler, asapScheduler } from 'rxjs';
import { TextNode } from 'parse5';
export function createElement<T extends HTMLElement>(tagName: string, options?: ElementCreationOptions): Observable<T> {
    return Observable.create((obser: Observer<T>) => {
        obser.next(document.createElement(tagName, options) as T);
        obser.complete();
    });
}
export function createTextNode(data: string): Observable<TextNode> {
    return Observable.create((obser: Observer<TextNode>) => {
        obser.next(document.createTextNode(data));
        obser.complete();
    });
}
export function parse(htmlObj: any, parent: HTMLElement, head: HTMLHeadElement) {
    return of(htmlObj).pipe(
        switchMap((tarObj: any) => {
            // 过滤掉body,head,html
            const ignore = ['body', 'script', 'html', 'head', 'meta'].indexOf(tarObj.tagName) === -1;
            if (tarObj.tagName && ignore) {
                return createElement(tarObj.tagName).pipe(
                    map((res: HTMLElement) => {
                        if (['link', 'title'].indexOf(tarObj.tagName) === -1) {
                            parent.appendChild(res);
                            parent = res;
                        } else {
                            head.appendChild(res);
                            parent = res;
                        }
                        tarObj.attrs.map(attr => {
                            res.setAttribute(attr.name, attr.value);
                        });
                        return parent;
                    }),
                    concat(
                        from(tarObj.childNodes).pipe(
                            filter(res => !!res),
                            concatMap((res: any) => {
                                return parse(res, parent, head)
                            })
                        )
                    )
                );
            } else if (tarObj.nodeName === '#text') {
                return createTextNode(tarObj.value).pipe(
                    concatMap((res: HTMLElement) => {
                        return of(parent.appendChild(res))
                    })
                );
            } else {
                if (tarObj.childNodes) {
                    return from(tarObj.childNodes).pipe(
                        concatMap(res => {
                            return parse(res, parent, head);
                        })
                    )
                } else {
                    return of(null);
                }
            }
        }),
        filter(res => !!res),
        // observeOn(animationFrameScheduler)
    )
}
import data from './data';
const div = document.createElement('body');
parse(data, div, document.head).pipe(
    takeLast(1)
).subscribe(() => {
    document.body.appendChild(div);
});
