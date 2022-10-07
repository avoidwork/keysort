/**
 * keysort
 *
 * @copyright 2022 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 2.0.0
 */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.lru={}));})(this,(function(exports){'use strict';function explode (obj, arg = ",") {
	return obj.replace(/^(\s+|\t+)|(\s+|\t+)$/g, "").split(new RegExp("\\s*" + arg + "\\s*"));
}const notDot = /-|\s/;
const braceS = "[\"";
const braceE = "\"]";const nu = " !== undefined";

function keysort (obj, query, sub = "") {
	const queries = explode(query.replace(/\s*asc/ig, "").replace(/\s*desc/ig, " desc")).map(i => i.split(" ")),
		sorts = [];

	if (sub) {
		sub = "." + sub;
	}

	for (const [a, b] of queries) {
		const y = b === "desc" ? 1 : -1,
			x = -y;

		let s = ".",
			e = "";

		if (notDot.test(a)) {
			s = braceS;
			e = braceE;
		}

		sorts.push(`if (a${sub}${s}${a}${e}${nu} && b${sub}${s}${a}${e}${nu}) {`);
		sorts.push(`  if (a${sub}${s}${a}${e} < b${sub}${s}${a}${e}) return ${y};`);
		sorts.push(`  if (a${sub}${s}${a}${e} > b${sub}${s}${a}${e}) return ${x};`);
		sorts.push("} else {");
		sorts.push(`  if (a${sub}${s}${a}${e}${nu}) return ${y};`);
		sorts.push(`  if (b${sub}${s}${a}${e}${nu}) return ${x};`);
		sorts.push("}");
	}

	sorts.push("return 0;");

	return obj.sort(new Function("a", "b", sorts.join("\n")));
}exports.keysort=keysort;Object.defineProperty(exports,'__esModule',{value:true});}));