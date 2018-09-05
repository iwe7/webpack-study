import { Configuration } from "webpack";
import { resolve } from 'path';
import { root } from '../root';
export function getResolve(): Configuration {
    return {
        resolve: {
            mainFields: ["jsnext:main","browser", "main"],
            symlinks: true,
            alias: {
                "widgets": "./widgets"
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
