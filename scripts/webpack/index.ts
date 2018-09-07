import { APlugin } from './models';
import { compilation, Compiler, Stats } from 'webpack';

export class TestPlugin extends APlugin {
    constructor() {
        super('test-plugin');
    }
    afterCompile(compilation: compilation.Compilation): void { }
    afterEmit(compilation: compilation.Compilation): void {
        console.log(compilation);
    }
    afterEnvironment(): void { }
    afterPlugins(compiler: Compiler): void { }
    afterResolvers(compiler: Compiler): void { }
    beforeCompile(res: any): void { }
    beforeRun(compilation: compilation.Compilation): void { }
    compilation(compilation: compilation.Compilation, res: { normalModuleFactory: compilation.NormalModuleFactory }): void { }
    compile(res: any): void { }
    contextModuleFactory(factory: compilation.ContextModuleFactory): void { }
    done(stats: Stats): void { }
    emit(compilation: compilation.Compilation): void { }
    entryOption(): void { }
    environment(): void { }
    failed(err: Error): void { }
    make(compilation: compilation.Compilation): void { }
    normalModuleFactory(factory: compilation.NormalModuleFactory): void { }
    run(compilation: compilation.Compilation): void { }
    shouldEmit(compilation: compilation.Compilation): void { }
    thisCompilation(compilation: compilation.Compilation, res: { normalModuleFactory: compilation.NormalModuleFactory }): void { }
    watchClose(): void { }
    watchRun(compiler: Compiler): void { }
}
