import { Output, Configuration } from 'webpack';
import { root } from './root';
import { resolve } from 'path';
export function getOutput(): Configuration {
    const output: Output = {
        path: resolve(root, 'dist'),
        filename: "[name].js",
        library: "imeepos",
        libraryTarget: "umd",
        crossOriginLoading: "use-credentials"
    };
    return { output }
}
