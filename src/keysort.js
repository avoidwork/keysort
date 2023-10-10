import {explode} from "./explode.js";
import {BRACE_END, BRACE_START, NOT_DOT} from "./regex.js";
import {DESC, EMPTY, NOT_UNDEFINED, PERIOD, SPACE, SPACE_DESC} from "./constants.js";

export function keysort (obj = [], query = "", toSorted = false) {
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
}
