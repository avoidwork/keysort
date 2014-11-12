/**
 * keysort
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2014 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/keysort/master/LICENSE>
 * @link http://avoidwork.github.io/keysort/
 * @module keysort
 * @version 0.2.0
 */
(function ( global ) {
"use strict";

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
function each ( obj, fn ) {
	var nth = obj.length,
	    i   = -1;

	while ( ++i < nth ) {
		if ( fn.call( obj, obj[i], i ) === false ) {
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
function explode ( obj, arg ) {
	arg = arg || ",";

	return obj.replace( /^(\s+|\t+)|(\s+|\t+)$/g, "" ).split( new RegExp( "\\s*" + arg + "\\s*" ) );
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


// Node, AMD & window supported
if ( typeof exports !== "undefined" ) {
	module.exports = sort;
}
else if ( typeof define === "function" ) {
	define( function () {
		return sort;
	});
}
else {
	global.keysort = sort;
}
})( this );
