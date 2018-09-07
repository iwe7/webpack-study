import { Subject, Subscriber, Subscription, fromEvent, merge } from "rxjs";
import { fork, ChildProcess } from "child_process";

export class CPForkSubject<T> extends Subject<T> {
    public fork: ChildProcess;
    constructor(private file: string, private start: T) {
        super();
    }

    public next(val: T) {
        this.fork.send(val, (err: Error) => {
            if (err) {
                super.error(err);
            }
        });
    }

    public complete() {
        this.resetState();
        super.complete();
    }

    public resetState() {
        if (this.fork) {
            this.fork.kill();
            this.fork = null;
        }
    }

    public error(err: Error) {
        this.resetState();
        super.error(err);
    }

    public _superNext(msg: T) {
        this.observers = this.observers || [];
        super.next(msg);
    }

    public _subscribe(subscriber: Subscriber<T>): Subscription {
        this.fork = fork(this.file);
        this.fork.on('message', (msg: T) => this._superNext(msg));
        merge(
            fromEvent(this.fork, 'close'),
            fromEvent(this.fork, 'disconnect'),
            fromEvent(this.fork, 'exit'),
        ).subscribe(() => this.complete())
        this.fork.on('error', (e: Error) => {
            this.error(e);
        });
        this.fork.send(this.start)
        return super._subscribe(subscriber);
    }

    public unsubscribe() {
        this.resetState();
        super.unsubscribe();
    }
}
