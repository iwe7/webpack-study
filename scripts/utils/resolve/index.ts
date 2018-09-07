import { Configuration } from "webpack";
import { resolve } from 'path';
import { root } from '../root';
const rxjs = require('rxjs/_esm2015/path-mapping')();
export function getResolve(): Configuration {
    return {
        resolve: {
            mainFields: ["jsnext:main", "browser", "main"],
            symlinks: true,
            alias: {
                widgets: "./widgets",
                ...rxjs
            },
            descriptionFiles: [
                "package.json",
                "imeepos.json"
            ],
            modules: [
                resolve(root, "node_modules"),
                resolve(root, "packages")
            ]
        }
    }
}
