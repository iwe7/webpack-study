import { Entry, Configuration } from 'webpack';
import { join } from 'path';
import { root } from '../root';
export const getEntry = (): Configuration => {
    const entry: Entry = {
        ...getPackagesEntry(),
        ...getWidgetEntry(),
        ...getAddonsEntry(),
        ...getServerEntry(),
        ...getCommonEntry(),
        ...getScriptsEntry()
    };
    return { entry };
}

const getCommonEntry = () => {
    const entry: Entry = {};
    return entry;
}

const getServerEntry = () => {
    const entry: Entry = {
        server: join(root, 'src/index.ts')
    };
    return entry;
}

const getPackagesEntry = () => {
    const entry: Entry = {};
    return entry;
}

const getWidgetEntry = () => {
    const entry: Entry = {};
    return entry;
}

const getAddonsEntry = () => {
    const entry: Entry = {};
    return entry;
}

const getScriptsEntry = () => {
    const entry: Entry = {};
    return entry;
}
