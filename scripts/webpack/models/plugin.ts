import { compilation, Compiler, Plugin, Stats } from 'webpack';

export abstract class APlugin implements Plugin {
    _compiler: Compiler;
    _compilation: compilation.Compilation;
    constructor(public name: string) { }
    apply(compiler: Compiler): void {
        this._compiler = compiler;
        compiler.hooks.afterCompile.tap(this.name, (compilation: compilation.Compilation) => {
            this.afterCompile(compilation);
        });
        compiler.hooks.afterEmit.tap(this.name, (compilation: compilation.Compilation) => {
            this.afterEmit(compilation);
        });
        compiler.hooks.afterEnvironment.tap(this.name, () => {
            this.afterEnvironment();
        });
        compiler.hooks.afterPlugins.tap(this.name, (compiler: Compiler) => {
            this.afterPlugins(compiler);
        });
        compiler.hooks.afterResolvers.tap(this.name, (compiler: Compiler) => {
            this.afterResolvers(compiler);
        });
        compiler.hooks.beforeCompile.tap(this.name, (res: any) => {
            this.beforeCompile(res);
        });
        compiler.hooks.beforeRun.tap(this.name, (compilation: compilation.Compilation) => {
            this.beforeRun(compilation);
        });
        compiler.hooks.compilation.tap(this.name, (compilation: compilation.Compilation, res: { normalModuleFactory: compilation.NormalModuleFactory }) => {
            this.compilation(compilation, res);
        });
        compiler.hooks.compile.tap(this.name, (res: any) => {
            this.compile(res);
        });
        compiler.hooks.contextModuleFactory.tap(this.name, (factory: compilation.ContextModuleFactory) => {
            this.contextModuleFactory(factory);
        });
        compiler.hooks.done.tap(this.name, (stats: Stats) => {
            this.done(stats);
        });
        compiler.hooks.emit.tap(this.name, (compilation: compilation.Compilation) => {
            this.emit(compilation);
        });
        compiler.hooks.entryOption.tap(this.name, () => {
            this.entryOption();
        });
        compiler.hooks.environment.tap(this.name, () => {
            this.environment();
        });
        compiler.hooks.failed.tap(this.name, (err: Error) => {
            this.failed(err);
        });
        compiler.hooks.make.tap(this.name, (compilation: compilation.Compilation) => {
            this.make(compilation);
        });
        compiler.hooks.normalModuleFactory.tap(this.name, (factory: compilation.NormalModuleFactory) => {
            this.normalModuleFactory(factory);
        });
        compiler.hooks.run.tap(this.name, (compilation: compilation.Compilation) => {
            this.run(compilation);
        });
        compiler.hooks.shouldEmit.tap(this.name, (compilation: compilation.Compilation) => {
            this.shouldEmit(compilation);
        });
        compiler.hooks.thisCompilation.tap(this.name, (compilation: compilation.Compilation, res: { normalModuleFactory: compilation.NormalModuleFactory }) => {
            this.thisCompilation(compilation, res);
        });
        compiler.hooks.watchClose.tap(this.name, () => {
            this.watchClose();
        });
        compiler.hooks.watchRun.tap(this.name, (compiler: Compiler) => {
            this.watchRun(compiler);
        });
    }
    abstract afterCompile(compilation: compilation.Compilation): void;
    abstract afterEmit(compilation: compilation.Compilation): void;
    abstract afterEnvironment(): void;
    abstract afterPlugins(compiler: Compiler): void;
    abstract afterResolvers(compiler: Compiler): void;
    abstract beforeCompile(res: any): void;
    abstract beforeRun(compilation: compilation.Compilation): void;
    abstract compilation(compilation: compilation.Compilation, res: { normalModuleFactory: compilation.NormalModuleFactory }): void;
    abstract compile(res: any): void;
    abstract contextModuleFactory(factory: compilation.ContextModuleFactory): void;
    abstract done(stats: Stats): void;
    abstract emit(compilation: compilation.Compilation): void;
    abstract entryOption(): void;
    abstract environment(): void;
    abstract failed(err: Error): void;
    abstract make(compilation: compilation.Compilation): void;
    abstract normalModuleFactory(factory: compilation.NormalModuleFactory): void;
    abstract run(compilation: compilation.Compilation): void;
    abstract shouldEmit(compilation: compilation.Compilation): void;
    abstract thisCompilation(compilation: compilation.Compilation, res: { normalModuleFactory: compilation.NormalModuleFactory }): void;
    abstract watchClose(): void;
    abstract watchRun(compiler: Compiler): void;
}
