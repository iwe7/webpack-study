import { match } from 'ramda';

export function domCreater(querySelector: string, ...contents: any[]) {
    const nodeType = match(/^[a-z0-9-]+/i)(querySelector);
    const id = match(/#([a-z]+[a-z0-9-_]*)/gi)(querySelector);
    const classes = match(/\.([a-z]+[a-z0-9-]*)/gi)(querySelector);
    const attributes = match(/\[([a-z][a-z-]+)(=['|"]?([^\]]*)['|"]?)?\]/gi)(querySelector);
    const node = nodeType[0] || 'div';
    const elt = document.createElement(node);
    if (id) {
        elt.id = id[0].replace('#', '');
    }
    if (classes) {
        const attrClasses = classes.join(' ').replace(/\./g, '');
        elt.setAttribute('class', attrClasses);
    }
    if (attributes) {
        attributes.forEach(item => {
            item = item.slice(0, -1).slice(1);
            const items = item.split('=');
            const label = items[0];
            let value = items[1];
            if (value) {
                value = value.replace(/^['"](.*)['"]$/, '$1');
            }
            elt.setAttribute(label, value || '');
        });
    }
    contents.forEach(item => {
        if (typeof item === 'string' || typeof item === 'number') {
            elt.appendChild(document.createTextNode(item + ''));
        } else if (item.nodeType === document.ELEMENT_NODE) {
            elt.appendChild(item);
        }
    });
    return elt;
}
