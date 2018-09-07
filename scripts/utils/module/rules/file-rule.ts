import { Rule } from 'webpack';
export const fileRule: Rule = {
    test: /\.(eot|svg|cur)$/,
    loader: 'file-loader',
    options: {
        name: `[name].[ext]`,
        limit: 10000
    }
}
