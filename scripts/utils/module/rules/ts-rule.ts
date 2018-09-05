import { Rule } from "webpack";
export const tsRule: Rule = {
    test: /\.tsx?$/,
    loader: "ts-loader"
};
