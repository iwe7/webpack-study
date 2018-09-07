import { tap, map } from 'rxjs/operators';
import { ProcessSubject } from '../process/process';
const proc = new ProcessSubject();
proc.pipe(
    tap((res: any) => {
        console.log(res)
    })
).subscribe();
