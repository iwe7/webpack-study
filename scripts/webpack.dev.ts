import { resolve } from 'path';
import { Configuration, Plugin, Compiler } from 'webpack';

import { getDevServer } from './devServer/index';
import { getEntry, getModule, getOutput, getPlugins, getResolve, logger } from './utils';
import { getOptimization } from './utils/optimization';

import webpackMerge = require('webpack-merge');
import webapck = require('webpack');
import WebpackDevServer = require('webpack-dev-server');
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
import { TestPlugin } from './webpack';
export const cfg: Configuration = webpackMerge(
    getEntry(),
    getOutput(),
    getModule(),
    getPlugins(),
    getResolve(),
    getOptimization(),
    defaultConfig,
    {
        plugins: [
            new TestPlugin()
        ]
    }
);

const devConfig = getDevServer();
const dev = new WebpackDevServer(webapck(cfg), devConfig)
dev.listen(devConfig.port, devConfig.host, (err: Error) => {
    if (err) {
        throw err;
    }
    console.log(`dev server start at http://localhost:${devConfig.port}`);
});
