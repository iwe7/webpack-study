import { tap } from 'rxjs/operators';
import { IComponent, CoreComponent } from '../../core';
import { Subject, interval } from 'rxjs';

@IComponent({
    selector: "video-player"
})
export class VideoPlayerElement extends HTMLElement {
    // 改变
    props = new Subject();

    constructor() {
        super();
        this.render();
        interval(100).pipe(
            tap(res => {
                this.props.next(res);
            })
        ).subscribe();
    }
    render() {
        this.props.pipe(
            tap((res: string) => {
                this.innerText = res;
            })
        ).subscribe();
    }
}
