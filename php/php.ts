import engine = require('php-parser');
import { readFileSync } from 'fs';
import { resolve } from 'path';

const parser = new engine({
    parser: {
        extractDoc: true,
        php7: true
    },
    ast: {
        withPositions: true
    }
});
const phpFile = readFileSync(resolve(process.cwd(), 'php/test/example.php')).toString();
const code = parser.parseCode(phpFile);
console.log('File parse:', code);
console.log(parser);
