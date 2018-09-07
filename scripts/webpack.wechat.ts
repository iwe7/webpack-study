import { resolve } from 'path';
import { Configuration } from 'webpack';

import { getDevServer } from './devServer/index';
import { getEntry, getModule, getOutput, getPlugins, getResolve, logger } from './utils';
import { getOptimization } from './utils/optimization';
import { join } from 'path';
import webpackMerge = require('webpack-merge');
import webapck = require('webpack');
import WebpackDevServer = require('webpack-dev-server');
const root = process.cwd();
const defaultConfig: Configuration = {
    mode: "production",
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
    getOutput(),
    getModule(),
    getPlugins(),
    getResolve(),
    getOptimization(),
    defaultConfig,
    {
        plugins: [],
        entry: {
            main: join(root, "wechat/index.ts")
        },
        output: {
            path: join(root, "dist/wechat")
        }
    }
);

const devConfig = getDevServer();
webapck(cfg).watch({
    ignored: ["node_modules"]
}, logger);
// const dev = new WebpackDevServer(webapck(cfg), devConfig)
// dev.listen(devConfig.port, devConfig.host, (err: Error) => {
//     if (err) {
//         throw err;
//     }
//     console.log(`dev server start at http://localhost:${devConfig.port}`);
// });
