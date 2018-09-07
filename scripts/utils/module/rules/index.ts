import { urlRule } from './url-rule';
import { htmlRule } from './html-rule';
import { fileRule } from './file-rule';
import { scssRule } from './scss-rule';
import { Module } from 'webpack';
import { cssRule } from './css-rule';
import { tsRule } from './ts-rule';
export function getRules(): Module {
    return {
        rules: [
            cssRule,
            tsRule,
            scssRule,
            fileRule,
            htmlRule,
            urlRule
        ]
    }
}
