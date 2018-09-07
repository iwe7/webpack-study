import { findElectronJson } from './get-electron-entry';
import { resolve, dirname } from 'path';
import { Configuration } from 'webpack';
import { getEntry, getModule, getOutput, getPlugins, getResolve, logger } from '../utils';
import webpackMerge = require('webpack-merge');
import webapck = require('webpack');
import { map, tap } from 'rxjs/operators';
import { readFileSync } from 'fs';
let root = process.cwd();
const defaultConfig: Configuration = {
    mode: "development",
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: "source-map",
    externals: {
        "jquery": "jQuery",
        "swiper": "Swiper",
        "chart.js": "Chart",
        "d3": "d3"
    },
    target: "web",
    output: {
        path: resolve(process.cwd(), 'dist/dev')
    },
    profile: true
}

export const electronMain: Configuration = webpackMerge(
    getEntry(),
    getOutput(),
    getModule(),
    getResolve(),
    defaultConfig
);

export const electronRender: Configuration = webpackMerge(
    getEntry(),
    getOutput(),
    getModule(),
    getResolve(),
    getPlugins(),
    defaultConfig
);

findElectronJson.pipe(
    map((res: string) => {
        root = dirname(resolve(root, res));
        return JSON.parse(readFileSync(res).toString())
    }),
    map(res => {
        const main = [];
        res.main.map(input => {
            main.push(resolve(root, input))
        });
        res.main = main;

        const render = [];
        res.render.map(input => {
            render.push(resolve(root, input))
        });
        res.render = render;
        return res;
    }),
    tap(res => {
        electronMain.entry = {
            [`${res.name}/main`]: res.main
        };
        electronMain.target = "electron-main";
        electronRender.entry = {
            [`${res.name}/render`]: res.render
        };
        electronRender.target = "electron-renderer";
    })
).subscribe(() => {
    webapck([electronMain, electronRender]).watch({
        ignored: ["node_modules"]
    }, logger);
});
