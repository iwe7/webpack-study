import { definePlugin } from './src/define-plugin';
import { moduleConcatenationPlugin } from './src/module-concatenation-plugin';
import { namedModulesPlugin } from './src/named-modules-plugin';
import { extractTextWebpackPlugin } from './src/extract-text-webpack-plugin';
import { Configuration } from 'webpack';
export function getPlugins(): Configuration {
    return {
        plugins: [
            extractTextWebpackPlugin,
            namedModulesPlugin,
            moduleConcatenationPlugin,
            definePlugin
        ]
    }
}
