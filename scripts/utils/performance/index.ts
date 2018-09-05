import { Configuration } from 'webpack';
export function getPerformance(): Configuration {
    return {
        performance: {
            hints: "warning",
            maxAssetSize: 200000,
            maxEntrypointSize: 400000
        },
    }
}
