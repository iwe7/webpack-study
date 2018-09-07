export const componentMap: Map<string, any> = new Map();
export interface IComponent {
    selector: string;
}
export const IComponentConst = '__i_component_metadata__';
export const IComponent = (options: IComponent): ClassDecorator => {
    return (target: any) => {
        componentMap.set(options.selector, target);
        Reflect.defineMetadata(IComponentConst, options, target)
    }
}
