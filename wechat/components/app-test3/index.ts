import { IComponent, CoreComponent } from '../../core';

@IComponent({
    selector: "app-test3"
})
export class Test3Element extends CoreComponent {
    render() {
        this.innerHTML = `
            app test3
        `;
    }
}
