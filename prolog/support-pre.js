// utility functions for Cons.toString()
function isNil(x) {
    if ("string" == typeof(x)) {
	if ("nil" == x) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
}
function isCons (maybeCell) {
    if ("object" == typeof(maybeCell)) {
	if (maybeCell.isPair) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
}
function carItemToString(x) {
    if (x == undefined) {
	return "error(undefined)";
    } else if (x == null) {
	return "error(null)";
    } else if (isNil(x)) {
	return "nil";
    } else if (isCons(x)) {
	return x.toString();
    } else {
	return x.toString();
    }
}
function cdrItemToString(x) {
    if (x == undefined) {
	return "error(undefined)";
    } else if (x == null) {
	return "error(null)";
    } else if (isNil(x)) {
	return "";
    } else if (isCons(x)) {
	return "";
    } else {
	return x.toString();
    }
}

function toSpacer(x) { // return " . " if cell contains a non-nil/non-next-cell item, return " " if end-of-list, else return ""
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    if (x == undefined) {
	return " ";
    } else if (x == null) {
	return " ";
    } else if ( ("object" == typeof(x) && x.isPair) ) {
	if ( ("object" == typeof(x.cdr)) ) {
	    return " ";
	} else if (isNil(x.cdr)) {
	    return "";
	} else {
	    return " . ";
	}
    } else {
	throw "can't happen";
    }
}

function toTrailingSpace(x) { // return " " if end of list, else ""
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    if (x == undefined) {
	return " ";
    } else if (x == null) {
	return " ";
    } else if ( ("object" == typeof(x) && x.isPair) ) {
	if ( ("object" == typeof(x.cdr)) ) {
	    return " ";
	} else if (isNil(x.cdr)) {
	    return "";
	} else {
	    return "";
	}
    } else {
	throw "can't happen";
    }
}


function continueCDRing(maybeCell) {  // if x.cdr is another Cons, return true, if it's "nil" return false, if it's a primitive return false, else return false
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    // x should be a Cons cell or "nil" or a primitive, but it might be null or undefined (an internal error that I want to see)
    if (maybeCell == undefined) {
	return false;
    } else if (maybeCell == null) {
	return false;
    } else if (isNil(maybeCell)) {
	return false;
    } else if (isCons(maybeCell)) {  // a Cons cell
	let next = cdr(maybeCell);
	if (isCons(next)) {
	    return true;
	} else {
	    return false;
	}
    } else if ("object" == typeof(maybeCell)) {
	return false;
    } else {
	return false;
    }
}
function nextCell(maybeCell) { // return cdr of cell if we are to continue (determined by continueCDRing function, above), else return undefined
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    // x should be a Cons cell or "nil" or a primitive, but it might be null or undefined (an internal error that I want to see)
    if (maybeCell == undefined) {
	return undefined;
    } else if (maybeCell == null) {
	return undefined;
    } else if (isNil(maybeCell)) {
	return undefined;
    } else if (isCons(maybeCell)) {
	return cdr(maybeCell);  // this will return a Cons or might return "nil" if at end of list
    } else if ("object" == typeof(maybeCell)) {
	return undefined;
    } else {
	return undefined;
    }
}
function cellToStr(cell) {
    let str = "(";
    let keepGoing = true;
    while (keepGoing) {
	let a = carItemToString(car(cell));
	let d = cdrItemToString(cdr(cell));
	let spacer = toSpacer(cell);
	let trailer = toTrailingSpace(cell);
	str = str + a + spacer + d + trailer;
	keepGoing = continueCDRing(cell);
	cell = nextCell(cell);
    }
    return str + ")";
}
/////

function Cons(car,cdr) { 
    this.car = car;
    this.cdr = cdr;
    this.isPair = true;
    this.toString = function() {  // returns string (a b) or (a . b) with appropriate trailing space in the possible presence of javascript errors (null and undefined)
	return cellToStr(this);
   }
};

function car(cell) {
    return cell.car;
}
function cdr(cell) {
    return cell.cdr;
}
function cddr(cell) {
    return cdr(cdr(cell));
}
function cdddr(cell) {
    return cdr(cdr(cdr(cell)));
}
function cddddr(cell) {
    return cdr(cdr(cdr(cdr(cell))));
}
function cdddddr(cell) {
    return cdr(cdr(cdr(cdr(cdr(cell)))))
}

function caar (cell) {
    return car(car(cell));
}

function cadr (cell) {
    return car(cdr(cell));
}

function caddr (cell) {
    return car(cddr(cell));
}

function cadddr (cell) {
    return car(cdddr(cell));
}

function caddddr (cell) {
    return car(cddddr(cell));
}

function cadaar (cell) {
    return car(cdr(car(car(cell))));
}

function cons(x,y) {
    if (x == undefined && y == undefined) {
	return "nil";
    } else if (y == undefined) {
	return new Cons(x,"nil");
    } else {
	return new Cons(x,y);
    }
}

function list() {
    var result = "nil";
    for(var i = (arguments.length-1); i >= 0 ; i--) {
	result = cons (arguments[i], result);
    }
    return result;
}
function eq_Q_(x,y) {
    return x === y;
}
function eqv_Q_(x,y) {
    return x === y;
}
function null_Q_(x) {
    if (x == "nil") {
	return true;
    } else if (x.isPair) {
	return false;
    } else {
	throw "null_Q_ not given a list()"
    }
}


function pair_Q_(x) {
    // Scheme doesn't like truthiness or falsiness, it wants true or false
    if (!x) {
	return false;
    } else if (x.isPair) {
	return true;
    } else {
	return false;
    }
}
function toDebug (x) {
    console.log("toDebug x=");
    console.log(x);
    if (x == "nil") {
	return "()";
    } else if (x == null) {
	return "NULL";
    } else if (x == undefined) {
	return "UNDEFINED";
    } else {
	return x.toString();
    }
}
function string_Q_(s) {
    return s && ("string" == typeof(s));
}

function string_EQ_Q_(s1,s2) {
    return s1 == s2;
}

function _plus(a,b){
    return a + b;
}

function set_car_B_(l,v) { l.car = v; }
function newline () { process.stdout.write("\n"); }
function display(x) { 
    if (x == "nil") {
	process.stdout.write("nil");
    } else if (x == undefined) {
	process.stdout.write("undefined");
    } else {
	process.stdout.write(x.toString()); 
    }
}


function error (x,y) {
    console.log ();
    console.log ("fatal error");
    console.log ("...");
    console.log (x);
    console.log (y);
    console.log ("...");
    throw 'fatal error occurred while running prolog.js';
}
