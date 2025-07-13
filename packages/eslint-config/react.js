import baseConfig from "./base";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
    ...baseConfig,
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/no-unknown-property": ["error", { ignore: ["css"] }],
        },
    },
];
