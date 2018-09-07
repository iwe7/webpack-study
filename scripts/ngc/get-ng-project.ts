const root = process.cwd();
import { listDir } from '../core/list-dir';
import { filter } from 'rxjs/operators';

export const findAngularJson = listDir(root, ['node_modules']).pipe(
    filter((res: string) => {
        return /angular.json$/.test(res)
    })
);

findAngularJson.subscribe((res: any) => {
    console.log(res)
});
