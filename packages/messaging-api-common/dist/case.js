"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalcaseKeysDeep = exports.pascalcaseKeys = exports.pascalcase = exports.camelcaseKeysDeep = exports.camelcaseKeys = exports.camelcase = exports.snakecaseKeysDeep = exports.snakecaseKeys = exports.snakecase = void 0;
const map_obj_1 = __importDefault(require("map-obj"));
const camel_case_1 = require("camel-case");
const pascal_case_1 = require("pascal-case");
const snake_case_1 = require("snake-case");
function isLastCharNumber(key) {
    return /^\d$/.test(key[key.length - 1]);
}
function splitLastChar(key) {
    return `${key.slice(0, key.length - 1)}_${key.slice(key.length - 1, key.length)}`;
}
/**
 * Converts a string to snake case.
 *
 * @param text - The input string
 * @returns The converted string
 *
 * @example
 * ```js
 * snakecase('fooBar');
 * //=> 'foo_bar'
 * ```
 */
function snakecase(text) {
    const matches = text.match(/\d+/g);
    if (!matches) {
        return (0, snake_case_1.snakeCase)(text);
    }
    let modifiedStr = text;
    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const mathIndex = modifiedStr.indexOf(match);
        modifiedStr = `${modifiedStr.slice(0, mathIndex)}_${modifiedStr.slice(mathIndex, modifiedStr.length)}`;
    }
    return (0, snake_case_1.snakeCase)(modifiedStr);
}
exports.snakecase = snakecase;
/**
 * Converts object keys to snake case.
 *
 * @param obj - The input object
 * @param options - The options to config this convert function
 * @returns The converted object
 *
 * @example
 * ```js
 * snakecaseKeys({ 'fooBar': true });
 * //=> { 'foo_bar': true }
 * ```
 */
function snakecaseKeys(obj, options) {
    return (0, map_obj_1.default)(obj, (key, val) => [snakecase(key), val], options);
}
exports.snakecaseKeys = snakecaseKeys;
/**
 * Converts object keys to snake case deeply.
 *
 * @param obj - The input object
 * @returns The converted object
 *
 * @example
 * ```js
 * snakecaseKeysDeep({ 'fooBar': { 'barFoo': true } });
 * //=> { 'foo_bar': { 'bar_foo': true } }
 * ```
 */
function snakecaseKeysDeep(obj) {
    return snakecaseKeys(obj, { deep: true });
}
exports.snakecaseKeysDeep = snakecaseKeysDeep;
/**
 * Converts a string to camel case.
 *
 * @param text - The input string
 * @returns The converted string
 *
 * @example
 * ```js
 * camelcase('foo_bar');
 * //=> 'fooBar'
 * ```
 */
function camelcase(text) {
    const parts = text.split('_');
    const modifiedStr = parts.reduce((acc, part) => {
        if (acc === '')
            return part;
        if (/^\d+/.test(part)) {
            return acc + part;
        }
        return `${acc}_${part}`;
    }, '');
    return (0, camel_case_1.camelCase)(modifiedStr);
}
exports.camelcase = camelcase;
/**
 * Converts object keys to camel case.
 *
 * @param obj - The input object
 * @param options - The options to config this convert function
 * @returns The converted object
 *
 * @example
 * ```js
 * camelcaseKeys({ 'foo_bar': true });
 * //=> { 'fooBar': true }
 * ```
 */
function camelcaseKeys(obj, options) {
    return (0, map_obj_1.default)(obj, (key, val) => [camelcase(key), val], options);
}
exports.camelcaseKeys = camelcaseKeys;
/**
 * Converts object keys to camel case deeply.
 *
 * @param obj - The input object
 * @returns The converted object
 *
 * @example
 * ```js
 * camelcaseKeysDeep({ 'foo_bar': { 'bar_foo': true } });
 * //=> { 'fooBar': { 'barFoo': true } }
 * ```
 */
function camelcaseKeysDeep(obj) {
    return camelcaseKeys(obj, { deep: true });
}
exports.camelcaseKeysDeep = camelcaseKeysDeep;
/**
 * Converts a string to pascal case.
 *
 * @param text - The input string
 * @returns The converted string
 *
 * @example
 * ```js
 * pascalcase('fooBar');
 * //=> 'FooBar'
 * ```
 */
function pascalcase(str) {
    return (0, pascal_case_1.pascalCase)(isLastCharNumber(str) ? splitLastChar(str) : str);
}
exports.pascalcase = pascalcase;
/**
 * Converts object keys to pascal case.
 *
 * @param obj - The input object
 * @param options - The options to config this convert function
 * @returns The converted object
 *
 * @example
 * ```js
 * pascalcaseKeys({ 'fooBar': true });
 * //=> { 'FooBar': true }
 * ```
 */
function pascalcaseKeys(obj, options) {
    return (0, map_obj_1.default)(obj, (key, val) => [pascalcase(key), val], options);
}
exports.pascalcaseKeys = pascalcaseKeys;
/**
 * Converts object keys to pascal case deeply.
 *
 * @param obj - The input object
 * @returns The converted object
 *
 * @example
 * ```js
 * pascalcaseKeysDeep({ 'fooBar': { 'barFoo': true } });
 * //=> { 'FooBar': { 'BarFoo': true } }
 * ```
 */
function pascalcaseKeysDeep(obj) {
    return pascalcaseKeys(obj, { deep: true });
}
exports.pascalcaseKeysDeep = pascalcaseKeysDeep;
//# sourceMappingURL=case.js.map