import { Rule } from 'webpack';
export const fileRule: Rule = {
    test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
    use: [
        "file-loader"
    ]
};
