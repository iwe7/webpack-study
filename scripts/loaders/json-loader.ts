import { RuleSetUseItem } from "webpack";

export default function jsonLoader(source: string): RuleSetUseItem | RuleSetUseItem[] {
    console.log(source);
    return '';
}
