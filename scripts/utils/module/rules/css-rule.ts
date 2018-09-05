
import { Rule } from "webpack";
import ExtractTextPlugin = require('extract-text-webpack-plugin');
export const cssRule: Rule = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
        use: ['css-loader']
    })
}
