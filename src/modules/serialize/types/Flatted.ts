/**
 * Fast and minimal circular JSON parser.
 * logic example
 ```js
 var a = [{one: 1}, {two: '2'}];
 a[0].a = a;
 // a is the main object, will be at index '0'
 // {one: 1} is the second object, index '1'
 // {two: '2'} the third, in '2', and it has a string
 // which will be found at index '3'
 Flatted.stringify(a);
 // [["1","2"],{"one":1,"a":"0"},{"two":"3"},"2"]
 // a[one,two]    {one: 1, a}    {two: '2'}  '2'
 ```
 */

/**
 * We use the "Flatted" type when we Flatted.stringify a variable.
 * This helps being explicit about the fact it should be Flatted.parse instead of JSON.parsed.
 *
 * @property ParsedType Useful for documentation purpose, doesn't do anything.
 *  Helps indicate what the type of the data will be, once parsed.
 *
 * XXX Flatted is supposed to provide its own TS typings, but I couldn't figure out how to use them.
 */
export type Flatted<ParsedType = any> = string;
