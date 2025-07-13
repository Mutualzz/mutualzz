import reactConfig from "./react";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default [
    ...reactConfig,
    ...pluginRouter.configs["flat/recommended"],
    ...pluginQuery.configs["flat/recommended"],
];
