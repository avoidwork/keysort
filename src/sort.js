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
