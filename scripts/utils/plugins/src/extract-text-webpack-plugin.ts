
import ExtractTextPlugin = require('extract-text-webpack-plugin');
export const extractTextWebpackPlugin = new ExtractTextPlugin({
    filename: "[name].css"
});
