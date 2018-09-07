import { BehaviorSubject } from 'rxjs';
export type Keys = string | symbol;
const getMap: Map<any, Keys[]> = new Map();
export const GetConst = '__get__metadata__';
export function Get(value: string): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        target[propertyKey] = new BehaviorSubject(null);
        if (!getMap.has(target.constructor)) {
            getMap.set(target.constructor, [propertyKey]);
        } else {
            getMap.set(target.constructor, [...getMap.get(target.constructor), propertyKey])
        }
        Reflect.defineMetadata(GetConst, value, target.constructor, propertyKey);
    }
}

export function getKeys(target: any) {
    const keys = getMap.get(target.constructor);
    if (keys) {
        keys.map((key: any) => {
            const _key = Reflect.getMetadata(GetConst, target.constructor, key);
            if (_key) {
                target[key].next(target.querySelector(_key));
            }
        });
    }
}
