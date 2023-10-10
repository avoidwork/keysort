/**
 * keysort
 *
 * @copyright 2023 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.0.1
 */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.lru={}));})(this,(function(exports){'use strict';function explode (obj, arg = ",") {
	return obj.trim().split(new RegExp(`\\s*${arg}\\s*`));
}const NOT_DOT = /-|\s/;
const BRACE_START = "[\"";
const BRACE_END = "\"]";const DESC = "desc";
const EMPTY = "";
const NOT_UNDEFINED = " !== undefined";
const PERIOD = ".";
const SPACE = " ";
const SPACE_DESC = " desc";function keysort (obj = [], query = "", toSorted = false) {
	const queries = explode(query.replace(/\s*asc/ig, EMPTY).replace(/\s*desc/ig, SPACE_DESC)).map(i => i.split(SPACE)),
		sorts = [];

	for (const [a, b] of queries) {
		const y = b === DESC ? 1 : -1,
			x = -y;

		let s = PERIOD,
			e = EMPTY;

		if (NOT_DOT.test(a)) {
			s = BRACE_START;
			e = BRACE_END;
		}

		sorts.push(`if (a${s}${a}${e}${NOT_UNDEFINED} && b${s}${a}${e}${NOT_UNDEFINED}) {`);
		sorts.push(`  if (a${s}${a}${e} < b${s}${a}${e}) return ${y};`);
		sorts.push(`  if (a${s}${a}${e} > b${s}${a}${e}) return ${x};`);
		sorts.push("} else {");
		sorts.push(`  if (a${s}${a}${e}${NOT_UNDEFINED}) return ${y};`);
		sorts.push(`  if (b${s}${a}${e}${NOT_UNDEFINED}) return ${x};`);
		sorts.push("}");
	}

	sorts.push("return 0;");

	return obj[toSorted ? "toSorted" : "sort"](new Function("a", "b", sorts.join("\n")));
}exports.keysort=keysort;}));