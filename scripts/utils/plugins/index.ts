import { hashedModuleIdsPlugin } from './src/hashed-module-ids-plugin';
import { scriptExtHtmlWebpackPlugin } from './src/script-ext-html-webpack-plugin';
import { webpackInlineManifestPlugin } from './src/webpack-inline-manifest-plugin';
import { htmlWebpackPlugin } from './src/html-webpack-plugin';
import { copyWebpackPlugin } from './src/copy-webpack-plugin';
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
            definePlugin,
            copyWebpackPlugin,
            htmlWebpackPlugin,
            webpackInlineManifestPlugin,
            scriptExtHtmlWebpackPlugin,
            hashedModuleIdsPlugin
        ]
    }
}
