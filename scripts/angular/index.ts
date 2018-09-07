import { logger } from '../utils';
import { Configuration, Compiler } from 'webpack';
import webpackMerge = require('webpack-merge');
import webpack = require('webpack');

import { resolve } from 'path';
import { htmlWebpackPlugin } from '../utils/plugins/src/html-webpack-plugin';
const root = process.cwd();
export const angularConfig: Configuration = webpackMerge(
    {
        entry: {
            main: resolve(root, "dist/tsc/angular/main.aot.js")
        },
        output: {
            path: resolve(root, 'dist/angular')
        },
        mode: "production",
        plugins: [
            htmlWebpackPlugin
        ],
        module: {
            rules: []
        },
        devtool: "source-map",
        externals: {
            // "@angular/core": "ng.core",
            // "@angular/compiler": "ng.compiler",
            // "@angular/router": "ng.router",
            // "@angular/froms": "ng.froms",
            // "@angular/common": "ng.common",
            // "@angular/common/http": "ng.common.http",
            // "zone.js/dist/zone": "Zone",
            // "@angular/platform-browser": "ng.platform.browser"
        },
    }
);

webpack(angularConfig, logger);
