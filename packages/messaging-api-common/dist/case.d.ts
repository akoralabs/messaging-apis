import type { CamelCase, CamelCasedProperties, CamelCasedPropertiesDeep, PascalCase, PascalCasedProperties, PascalCasedPropertiesDeep, SnakeCase, SnakeCasedProperties, SnakeCasedPropertiesDeep } from 'type-fest';
import type { Options as MapOptions } from 'map-obj';
declare type PlainObject = Record<string, any>;
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
declare function snakecase<T extends string>(text: T): SnakeCase<T>;
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
declare function snakecaseKeys<T extends PlainObject, O extends MapOptions>(obj: T, options?: O): O['deep'] extends true ? SnakeCasedPropertiesDeep<T> : SnakeCasedProperties<T>;
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
declare function snakecaseKeysDeep<T extends PlainObject>(obj: T): SnakeCasedPropertiesDeep<T>;
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
declare function camelcase<T extends string>(text: T): CamelCase<T>;
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
declare function camelcaseKeys<T extends PlainObject, O extends MapOptions>(obj: T, options?: O): O['deep'] extends true ? CamelCasedPropertiesDeep<T> : CamelCasedProperties<T>;
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
declare function camelcaseKeysDeep<T extends PlainObject>(obj: T): CamelCasedPropertiesDeep<T>;
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
declare function pascalcase<T extends string>(str: T): PascalCase<T>;
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
declare function pascalcaseKeys<T extends PlainObject, O extends MapOptions>(obj: T, options?: O): O['deep'] extends true ? PascalCasedPropertiesDeep<T> : PascalCasedProperties<T>;
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
declare function pascalcaseKeysDeep<T extends PlainObject>(obj: T): PascalCasedPropertiesDeep<T>;
export { snakecase, snakecaseKeys, snakecaseKeysDeep, camelcase, camelcaseKeys, camelcaseKeysDeep, pascalcase, pascalcaseKeys, pascalcaseKeysDeep, };
//# sourceMappingURL=case.d.ts.map