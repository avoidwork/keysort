/**
 * Sorts an Array of Objects with SQL ORDER BY clause
 *
 * @author [object Object]
 * @copyright 2017
 * @license BSD-3-Clause
 * @version 1.0.0
 */
(function (global) {
	"use strict";

	const notDot = /-|\s/,
		braceS = "[\"",
		braceE = "\"]";

	/**
	 * Iterates obj and executes fn
	 *
	 * Parameters for fn are 'value', 'index'
	 *
	 * @method each
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to execute on index values
	 * @return {Array}        Array
	 */
	function each (obj, fn) {
		const nth = obj.length;
		let i = -1;

		while (++i < nth) {
			if (fn.call(obj, obj[i], i) === false) {
				break;
			}
		}

		return obj;
	}

	/**
	 * Splits a string on comma, or a parameter, and trims each value in the resulting Array
	 *
	 * @method explode
	 * @param  {String} obj String to capitalize
	 * @param  {String} arg String to split on
	 * @return {Array}      Array of the exploded String
	 */
	function explode (obj, arg = ",") {
		return obj.replace(/^(\s+|\t+)|(\s+|\t+)$/g, "").split(new RegExp("\\s*" + arg + "\\s*"));
	}

	/**
	 * Sorts an Array based on key values, like an SQL ORDER BY clause
	 *
	 * @method sort
	 * @param  {Array}  obj   Array to sort
	 * @param  {String} query Sort query, e.g. "name, age desc, country"
	 * @param  {String} sub   [Optional] Key which holds data, e.g. "{data: {}}" = "data"
	 * @return {Array}        Sorted Array
	 */
	function sort (obj, query, sub = "") {
		const queries = explode(query.replace(/\s*asc/ig, "").replace(/\s*desc/ig, " desc")).map(i => i.split(" ")),
			sorts = [];

		if (sub && sub !== "") {
			sub = "." + sub;
		}

		each(queries, i => {
			const desc = i[1] === "desc",
				y = desc ? 1 : -1,
				x = desc ? -1 : 1;

			let s = ".",
				e = "";

			if (notDot.test(i[0])) {
				s = braceS;
				e = braceE;
			}

			sorts.push("if (a" + sub + s + i[0] + e + " !== undefined && b" + sub + s + i[0] + e + " !== undefined) {");
			sorts.push("  if (a" + sub + s + i[0] + e + " < b" + sub + s + i[0] + e + ") return " + y + ";");
			sorts.push("  if (a" + sub + s + i[0] + e + " > b" + sub + s + i[0] + e + ") return " + x + ";");
			sorts.push("} else {");
			sorts.push("  if (a" + sub + s + i[0] + e + " !== undefined) return " + (desc ? "-1" : "1") + ";");
			sorts.push("  if (b" + sub + s + i[0] + e + " !== undefined) return " + (desc ? "1" : "-1") + ";");
			sorts.push("}");
		});

		sorts.push("return 0;");

		return obj.sort(new Function("a", "b", sorts.join("\n")));
	}

	// Node, AMD & window supported
	if (typeof exports !== "undefined") {
		module.exports = sort;
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return sort;
		});
	} else {
		global.keysort = sort;
	}
}(this));
