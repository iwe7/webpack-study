import { merge } from 'rxjs';
import { resolve } from 'path';
import { CPForkSubject } from './process/child';

merge(
    run(resolve(__dirname, './bin/test'), 'start')
).subscribe((res: any) => console.log(res));

function run<T = any>(file: string, start: T) {
    const fork = new CPForkSubject(file, start).pipe();
    return fork;
}
