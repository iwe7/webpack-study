import { Configuration } from 'webpack';
import { getEntry, getOutput, getModule, getPlugins, logger } from './utils';
import webpackMerge = require('webpack-merge');
import webapck = require('webpack');
import { resolve } from 'path';
const defaultConfig: Configuration = {
    mode: "development",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
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
        path: resolve(process.cwd(), 'dist/ng')
    }
}
export const cfg: Configuration = webpackMerge(
    getEntry(),
    getOutput(),
    getModule(),
    getPlugins(),
    defaultConfig
);
webapck(cfg).watch({
    ignored: ["node_modules"]
}, logger);
