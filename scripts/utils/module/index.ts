import { Configuration } from "webpack";
import { getRules } from './rules/index';
export function getModule(): Configuration {
    return {
        module: {
            noParse: (content: string) => {
                return /jquery|swiper/.test(content);
            },
            ...getRules(),
        }
    }
}
