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

		if (sub) {
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
			sorts.push("  if (a" + sub + s + i[0] + e + " !== undefined) return " + y + ";");
			sorts.push("  if (b" + sub + s + i[0] + e + " !== undefined) return " + x + ";");
			sorts.push("}");
		});

		sorts.push("return 0;");

		return obj.sort(new Function("a", "b", sorts.join("\n")));
	}
