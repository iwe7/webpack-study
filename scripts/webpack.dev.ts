import { Configuration } from 'webpack';
import { getEntry, getOutput, getModule, getPlugins, logger, getResolve } from './utils';
import webpackMerge = require('webpack-merge');
import webapck = require('webpack');
import { resolve } from 'path';
import { getDevServer } from './devServer/index';
import WebpackDevServer = require('webpack-dev-server');
import { getOptimization } from './utils/optimization';
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
export const cfg: Configuration = webpackMerge(
    getEntry(),
    getOutput(),
    getModule(),
    getPlugins(),
    getResolve(),
    getOptimization(),
    defaultConfig
);

const devConfig = getDevServer();
const dev = new WebpackDevServer(webapck(cfg), devConfig)
dev.listen(devConfig.port, devConfig.host, (err: Error) => {
    if (err) {
        console.error(err);
    }
    console.log(`dev server start at http://localhost:${devConfig.port}`);
})
