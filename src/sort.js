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
	query       = query.replace( /\s*asc/ig, "" ).replace( /\s*desc/ig, " desc" );
	var queries = explode( query ).map( function ( i ) { return i.split( " " ); } ),
	    sorts   = [];

	if ( sub && sub !== "" ) {
		sub = "." + sub;
	}
	else {
		sub = "";
	}

	each( queries, function ( i ) {
		var s = ".",
		    e = "";

		if ( notDot.test( i[0] ) ) {
			s = braceS;
			e = braceE;
		}

		sorts.push( "try {" );

		if ( i[1] === "desc" ) {
			sorts.push( "if ( a" + sub + s + i[0] + e + " < b" + sub + s + i[0] + e + " ) return 1;" );
			sorts.push( "if ( a" + sub + s + i[0] + e + " > b" + sub + s + i[0] + e + " ) return -1;" );
		}
		else {
			sorts.push( "if ( a" + sub + s + i[0] + e + " < b" + sub + s + i[0] + e + " ) return -1;" );
			sorts.push( "if ( a" + sub + s + i[0] + e + " > b" + sub + s + i[0] + e + " ) return 1;" );
		}

		sorts.push( "} catch (e) {" );
		sorts.push( "try {" );
		sorts.push( "if ( a" + sub + s + i[0] + e + " !== undefined ) return " + ( i[1] === "desc" ? "-1" : "1") + ";" );
		sorts.push( "} catch (e) {}" );
		sorts.push( "try {" );
		sorts.push( "if ( b" + sub + s + i[0] + e + " !== undefined ) return " + ( i[1] === "desc" ? "1" : "-1") + ";" );
		sorts.push( "} catch (e) {}" );
		sorts.push( "}" );
	} );

	sorts.push( "return 0;" );

	return obj.sort( new Function( "a", "b", sorts.join( "\n" ) ) );
}
