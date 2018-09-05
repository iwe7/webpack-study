import { Stats } from 'webpack';
import colors = require('colors');
export const logger = (err: Error, stats: Stats) => {
    if (err) {
        console.error(`
            ${colors.red(err.name)}\n
            ${colors.yellow(err.message)}\n
            ${colors.green(err.stack)}
        `)
    }
    const data = stats.toJson();
    if (stats.hasErrors()) {
        console.error(loggerError(data.errors))
    }
    if (stats.hasWarnings()) {
        console.warn(loggerWarning(data.warnings))
    }
    console.info(statsToString(data))
}

function loggerWarning(warnings: any[]): string {
    const rs = (x: string) => x;
    const y = (x: string) => colors.bold(colors.yellow(x));
    return rs('\n' + warnings.map((warning: any) => y(`WARNING in ${warning}`)).join('\n\n'));
}

export function loggerError(errors: any[]) {
    const rs = (x: string) => x;
    const r = (x: string) => colors.bold(colors.red(x));
    return rs('\n' + errors.map((error: any) => r(`ERROR in ${error}`)).join('\n'));
}


export function statsToString(json: any) {
    const rs = (x: string) => x;
    const w = (x: string) => colors.bold(colors.white(x));
    const g = (x: string) => colors.bold(colors.green(x));
    const y = (x: string) => colors.bold(colors.yellow(x));

    const changedChunksStats = json.chunks
        .filter((chunk: any) => chunk.rendered)
        .map((chunk: any) => {
            const asset = json.assets.filter((x: any) => x.name == chunk.files[0])[0];
            const size = asset ? ` ${formatSize(asset.size)}` : '';
            const files = chunk.files.join(', ');
            const names = chunk.names ? ` (${chunk.names.join(', ')})` : '';
            const initial = y(chunk.entry ? '[entry]' : chunk.initial ? '[initial]' : '');
            const flags = ['rendered', 'recorded']
                .map(f => f && chunk[f] ? g(` [${f}]`) : '')
                .join('');
            return `chunk {${y(chunk.id)}} ${g(files)}${names}${size} ${initial}${flags}`;
        });

    const unchangedChunkNumber = json.chunks.length - changedChunksStats.length;
    if (unchangedChunkNumber > 0) {
        return '\n' + rs(stripIndents`
        Date: ${w(new Date().toISOString())} - Hash: ${w(json.hash)} - Time: ${w('' + json.time)}ms
        ${unchangedChunkNumber} unchanged chunks
        ${changedChunksStats.join('\n')}
        `);
    } else {
        return '\n' + rs(stripIndents`
        Date: ${w(new Date().toISOString())}
        Hash: ${w(json.hash)}
        Time: ${w('' + json.time)}ms
        ${changedChunksStats.join('\n')}
        `);
    }
}

function formatSize(size: number): string {
    if (size <= 0) {
        return '0 bytes';
    }
    const abbreviations = ['bytes', 'kB', 'MB', 'GB'];
    const index = Math.floor(Math.log(size) / Math.log(1000));
    return `${+(size / Math.pow(1000, index)).toPrecision(3)} ${abbreviations[index]}`;
}

function stripIndents(strings: TemplateStringsArray, ...values: any[]) {
    return String.raw(strings, ...values)
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .trim();
}
