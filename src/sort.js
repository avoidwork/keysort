/**
 * Sorts an Array based on key values, like an SQL ORDER BY clause
 *
 * @method sort
 * @param  {Array}  obj   Array to sort
 * @param  {String} query Sort query, e.g. "name, age desc, country"
 * @param  {String} sub   [Optional] Key which holds data, e.g. "{data: {}}" = "data"
 * @param  {Boolean} cast   [Optional] If true, will cast the values to integers before comparing them
                                                                   Useful if you need to compare numbers represented as strings
 * @return {Array}        Sorted Array
 */
function sort ( obj, query, sub, cast ) {
	query       = query.replace( /\s*asc/g, "" ).replace( /\s*desc/ig, " desc" );
	var queries = explode( query ).map( function ( i ) { return i.split( " " ); }),
	    sorts   = [];

	    cast = cast !== undefined;

	if ( sub && sub !== "" ) {
		sub = "." + sub;
	}
	else {
		sub = "";
	}

	each( queries, function ( i ) {
		var desc = i[1] === "desc",
		a = "a" + sub + "[\"" + i[0] + "\"]",
		b = "b" + sub + "[\"" + i[0] + "\"]";

		if(cast){
			sorts.push(a + " = " + a + ".toString().indexOf(\".\") === -1 ? parseInt(" + a + ", 10) : parseFloat(" + a + ");");
			sorts.push(b + " = " + b + ".toString().indexOf(\".\") === -1 ? parseInt(" + b + ", 10) : parseFloat(" + b + ");");
		}

		if ( !desc ) {
			sorts.push( "if ( " + a + " < " + b + " ) return -1;" );
			sorts.push( "if ( " + a + " > " + b + " ) return 1;" );
		}
		else {
			sorts.push( "if ( " + a + " < " + b + " ) return 1;" );
			sorts.push( "if ( " + a + " > " + b + " ) return -1;" );
		}
	});

	sorts.push( "else return 0;" );

	return obj.sort( new Function( "a", "b", sorts.join( "\n" ) ) );
}
