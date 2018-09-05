import { Configuration } from 'webpack-dev-server';
export function getDevServer(): Configuration {
    return {
        hot: true,
        compress: true,
        host: "0.0.0.0",
        port: 4200,
        clientLogLevel: "warning",
        inline: false,
        watchOptions: {
            // 去除目录
            ignored: /node_modules/,
            // 等待时间
            aggregateTimeout: 1000,
            // 轮训时间
            poll: 1000
        }
    };
}
