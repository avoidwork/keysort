"use strict";

/**
 * Sorts an Array of Objects with SQL ORDER BY clause
 *
 * @author [object Object]
 * @copyright 2017
 * @license BSD-3-Clause
 * @version 1.0.0
 */
(function (global) {
	var notDot = /-|\s/,
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
	function each(obj, fn) {
		var nth = obj.length;
		var i = -1;

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
	function explode(obj) {
		var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";

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
	function sort(obj, query) {
		var sub = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

		var queries = explode(query.replace(/\s*asc/ig, "").replace(/\s*desc/ig, " desc")).map(function (i) {
			return i.split(" ");
		}),
		    sorts = [];

		if (sub && sub !== "") {
			sub = "." + sub;
		}

		each(queries, function (i) {
			var desc = i[1] === "desc",
			    y = desc ? 1 : -1,
			    x = desc ? -1 : 1;

			var s = ".",
			    e = "";

			if (notDot.test(i[0])) {
				s = braceS;
				e = braceE;
			}

			sorts.push("var pA = a" + sub + s + i[0] + e + ";");
			sorts.push("var pB = b" + sub + s + i[0] + e + ";");
			sorts.push("var isA = pA !== undefined;");
			sorts.push("var isB = pB !== undefined;");
			sorts.push("if (isA && isB) {");
			sorts.push("  if (pA < pB) return " + y + ";");
			sorts.push("  if (pA > pB) return " + x + ";");
			sorts.push("}");
			sorts.push("if (isA) return " + (desc ? "-1" : "1") + ";");
			sorts.push("if (isB) return " + (desc ? "1" : "-1") + ";");
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
})(undefined);
