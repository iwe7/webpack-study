const root = process.cwd();
import { listDir } from '../core/list-dir';
import { filter } from 'rxjs/operators';

export const findElectronJson = listDir(root, ['node_modules']).pipe(
    filter((res: string) => {
        return /electron.json$/.test(res)
    })
);
