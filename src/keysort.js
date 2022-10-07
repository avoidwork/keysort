import {explode} from "./explode.js";
import {notDot, braceS, braceE} from "./regex.js";

export function keysort (obj, query, sub = "") {
	const queries = explode(query.replace(/\s*asc/ig, "").replace(/\s*desc/ig, " desc")).map(i => i.split(" ")),
		sorts = [];

	if (sub) {
		sub = "." + sub;
	}

	for (const [a, b] of queries) {
		const desc = b === "desc",
			y = desc ? 1 : -1,
			x = desc ? -1 : 1;

		let s = ".",
			e = "";

		if (notDot.test(a)) {
			s = braceS;
			e = braceE;
		}

		sorts.push("if (a" + sub + s + a + e + " !== undefined && b" + sub + s + a + e + " !== undefined) {");
		sorts.push("  if (a" + sub + s + a + e + " < b" + sub + s + a + e + ") return " + y + ";");
		sorts.push("  if (a" + sub + s + a + e + " > b" + sub + s + a + e + ") return " + x + ";");
		sorts.push("} else {");
		sorts.push("  if (a" + sub + s + a + e + " !== undefined) return " + y + ";");
		sorts.push("  if (b" + sub + s + a + e + " !== undefined) return " + x + ";");
		sorts.push("}");
	}

	sorts.push("return 0;");

	return obj.sort(new Function("a", "b", sorts.join("\n")));
}
