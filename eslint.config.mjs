import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

export default [{
    files: ["src/**/*.ts"],
    languageOptions: {parser, parserOptions: {project: "./tsconfig.json", tsconfigRootDir: import.meta.dirname}},
    plugins: {"@typescript-eslint": plugin},
    rules: {
        "no-prototype-builtins": "error",
        "no-console": "error",
        "no-useless-escape": "error",
        "@typescript-eslint/no-unused-vars": ["error", {args: "none"}],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unsafe-member-access": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-assignment": "error",
        "@typescript-eslint/no-unsafe-argument": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/restrict-plus-operands": ["error", {allowAny: false, allowNumberAndString: true}],
    },
}];
