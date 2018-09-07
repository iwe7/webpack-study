import { Observable, from, of, merge } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { join } from 'path';
import { lstatSync, readdirSync, existsSync } from 'fs';
export function listDir(root: string, ignore: string[] = []): Observable<string> {
    if (!existsSync(root)) {
        return from([]);
    }
    for (const ng of ignore) {
        if (root.indexOf(ng) > -1) {
            return from([]);
        }
    }
    if (lstatSync(root).isDirectory()) {
        return from(readdirSync(root)).pipe(
            map((res: string) => {
                return join(root, res);
            }),
            switchMap((res: string) => {
                if (lstatSync(res).isDirectory()) {
                    return merge(
                        of(res),
                        listDir(res, ignore)
                    );
                } else {
                    return of(res);
                }
            })
        );
    } else {
        return of(root);
    }
}
