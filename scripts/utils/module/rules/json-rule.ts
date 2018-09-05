import { Rule } from 'webpack';
import jsonLoader from '../../../loaders/json-loader';
export const jsonRule: Rule = {
    test: /\.json$/,
    loader: jsonLoader
};
