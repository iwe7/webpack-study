import "reflect-metadata"
export const ComponentMetadata = '__component_metadata__';
export function Component(options: any = {}) {
    return (target: any) => {
        options = {
            template: "index.html",
            styleUrls: "index.scss",
            ...options
        };
        Reflect.defineMetadata(ComponentMetadata, options, target)
    }
}
@Component()
export class ImsDemo { }
