import { Rule } from 'webpack';
import ExtractTextPlugin = require('extract-text-webpack-plugin');

export const scssRule: Rule = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
        use: [
            "css-loader",
            "sass-loader"
        ]
    })
};
