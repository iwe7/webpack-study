declare const doc: Document;
import { Subject } from 'rxjs';

export class DocSubject extends Subject<any> {

    public next(val: any) {
        switch (val.action) {
            case "create":
                doc.createElement(val.payload);
                break;
        }
    }
}
