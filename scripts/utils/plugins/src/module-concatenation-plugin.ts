import * as webpack from 'webpack';
import ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
export const moduleConcatenationPlugin = new ModuleConcatenationPlugin();
