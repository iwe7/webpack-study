import { parseFragment, DocumentFragment } from 'parse5';
import { readFileSync } from 'fs';
import { join } from 'path';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
// {{var}}绑定符

const bind = RegExp('\{\{(.*?)\}\}\s*?\{\{(.*?)\}\}', 'g');
const html: any = parseFragment(readFileSync(join(process.cwd(), 'render/index.html')).toString());
from(html.childNodes).pipe(
    tap((res: any) => {
        switch (res.nodeName) {
            case "#text":
                const res1 = bind.exec(res.value);
                // const res1 = res.value.match(bind)
                console.log(res1);
                break;
        }
    })
).subscribe(res => {
    console.log(res);
})

type ComponentSelector = string;
interface IComponent {
    selector: ComponentSelector;
}

interface IComponentFactory {
    create(): IComponent;
}

interface IDirective {
    selector: string;
}
interface IDirectiveFactory {
    create(): IDirective;
}
// 组件
const allComponent: Map<ComponentSelector, IComponentFactory> = new Map();
// 指令
const allDirective: Map<ComponentSelector, IDirectiveFactory> = new Map();
