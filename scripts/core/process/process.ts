import { Subject, fromEvent, merge, Subscriber, Subscription, ObjectUnsubscribedError } from 'rxjs';

export class ProcessSubject<T> extends Subject<T> {
    constructor() {
        super();
    }

    public next(val: T) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (process.send) {
            process.send(val, (err: Error) => {
                if (err) {
                    super.error(err);
                }
            });
        } else if (process.emit) {
            process.emit('message', val, null)
        } else {
            this.error(new Error('method not fond'));
        }
    }

    public complete() {
        process.exit();
        this.resetState();
        super.complete();
    }

    public resetState() {
        // process.removeAllListeners('message');
    }

    public error(err: Error) {
        process.exit();
        this.resetState();
        super.error(err);
    }

    public _superNext(msg: T) {
        this.observers = this.observers || [];
        super.next(msg);
    }

    public _subscribe(subscriber: Subscriber<T>): Subscription {
        const subscriber2 = super._subscribe(subscriber);
        process.on('message', (msg) => this._superNext(msg));
        merge(
            fromEvent(process, 'close'),
            fromEvent(process, 'disconnect'),
            fromEvent(process, 'exit'),
        ).subscribe(() => this.complete());
        return subscriber2;
    }

    public unsubscribe() {
        process.exit();
        super.unsubscribe();
    }
}
