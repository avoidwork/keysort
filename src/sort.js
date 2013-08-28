/**
 * Sorts an Array based on key values, like an SQL ORDER BY clause
 *
 * @method sort
 * @param  {Array}  obj   Array to sort
 * @param  {String} query Sort query, e.g. "name, age desc, country"
 * @param  {String} sub   [Optional] Key which holds data, e.g. "{data: {}}" = "data"
 * @return {Array}        Sorted Array
 */
function sort ( obj, query, sub ) {
	query       = query.replace( /\s*asc/g, "" ).replace( /\s*desc/ig, " desc" );
	var queries = explode( query ).map( function ( i ) { return i.split( " " ); }),
	    sorts   = [];

	if ( sub && sub !== "" ) {
		sub = "." + sub;
	}
	else {
		sub = "";
	}

	each( queries, function ( i ) {
		var desc = i[1] === "desc";

		if ( !desc ) {
			sorts.push( "if ( a" + sub + "[\"" + i[0] + "\"] < b" + sub + "[\"" + i[0] + "\"] ) return -1;" );
			sorts.push( "if ( a" + sub + "[\"" + i[0] + "\"] > b" + sub + "[\"" + i[0] + "\"] ) return 1;" );
		}
		else {
			sorts.push( "if ( a" + sub + "[\"" + i[0] + "\"] < b" + sub + "[\"" + i[0] + "\"] ) return 1;" );
			sorts.push( "if ( a" + sub + "[\"" + i[0] + "\"] > b" + sub + "[\"" + i[0] + "\"] ) return -1;" );
		}
	});

	sorts.push( "else return 0;" );

	return obj.sort( new Function( "a", "b", sorts.join( "\n" ) ) );
}
