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
function first(x) {
    return car(x);
};
function rest(x) {
    return cdr(x);
};
function AppendInefficient(list1,list2) {
    if (!pair_Q_ (list2)) {
	throw "AppendInefficient: list2 is not a Pair()";
    };
    return (function(){
	if (null_Q_(list1)) {
	    return list2;
	} else {
	    if (!pair_Q_ (list1)) {
		throw "AppendInefficient: list1 is not a Pair()";
	    };
	    return cons(car(list1),AppendInefficient(cdr(list1),list2));
	}
    })();
};
function AppendInefficient3(list1,list2,list3) {
    return AppendInefficient(list1,AppendInefficient(list2,list3));
};
let result_ = list();
function clear_result() {
    return (result_ = list());
};
function append_to_result(lis) {
    return (result_ = cons(lis,result_));
};
function get_result() {
    return result_;
};
function display_result() {
    return display(get_result());
};
let link = list;
let L_l = car;
let L_g = cadr;
let L_r = caddr;
let L_e = cadddr;
function L_n(x) {
    return car(cddddr(x));
};
function L_c(x) {
    return cadr(cddddr(x));
};
function clear_r(x) {
    return set_car_B_(cddr(x),list(list()));
};
function back6(l,g,r,e,n,c,whole_db) {
    return (function(){
	if (pair_Q_(g) && pair_Q_(r)) {
	    return prove6(l,g,cdr(r),e,n,c,whole_db);

	} else if (pair_Q_(l)) {
	    return prove6(L_l(l),L_g(l),cdr(L_r(l)),L_e(l),L_n(l),L_c(l),whole_db);

	} else {
	    return null;
	}
    })();
};
function prove6(l,g,r,e,n,c,whole_db) {
    return (function(){
	if (null_Q_(g)) {
	    (function(next_result=print_frame(e)) {
		return append_to_result(next_result);

	    })();
	    return back6(l,g,r,e,n,c,whole_db);

	} else if (eq_Q_("!",car(g))) {
	    clear_r(c);
	    return prove6(c,cdr(g),r,e,n,c,whole_db);

	} else if (eq_Q_("r!",car(g))) {
	    return prove6(l,cddr(g),r,e,n,cadr(g),whole_db);

	} else if (null_Q_(r)) {
	    return (function(){
		if (null_Q_(l)) {
		    return true;
		} else {
		    return back6(l,g,r,e,n,c,whole_db);
		}
	    })();

	} else if (foreign_Q_(car(g))) {
	    call_foreign(car(g),e);
	    return prove6(l,cdr(g),r,e,n,c,whole_db);

	} else if (foreign_Q_(car(r))) {
	    call_foreign(car(r),e);
	    return prove6(l,g,cdr(r),e,n,c,whole_db);

	}else {
	    return (function(a=copy(car(r),n)) {
		return (function(e_A_=unify(car(a),car(g),e)) {
		    return (function(){
			if (e_A_) {
			    return prove6(link(l,g,r,e,n,c),AppendInefficient3(cdr(a),list("r!",l),cdr(g)),whole_db,e_A_,_plus(1,n),l,whole_db);
			} else {
			    return back6(l,g,r,e,n,c,whole_db);
			}
		    })();

		})();

	    })();
	}

    })();
};
let empty = list(list("bottom"));
let name = cadr;
let time = cddr;
function var_Q_(x) {
    return pair_Q_(x) && string_Q_(car(x)) && string_EQ_Q_("?",car(x));
};
function lookup_loop(e,id,tm) {
    return (function(){
	if ((!pair_Q_(caar(e)))) {
	    return false;

	} else if (eq_Q_(id,name(caar(e))) && eqv_Q_(tm,time(caar(e)))) {
	    return car(e);

	}else {
	    return lookup_loop(cdr(e),id,tm);
	}

    })();
};
function lookup(v,e) {
    return (function(id=name(v),tm=time(v)) {
	return lookup_loop(e,id,tm);

    })();
};
function value(x,e) {
    return (function(){
	if (foreign_Q_(x)) {
	    return call_foreign(x,e);

	} else if (var_Q_(x)) {
	    return (function(v=lookup(x,e)) {
		return (function(){
		    if (v) {
			return value(cadr(v),e);
		    } else {
			return x;
		    }
		})();

	    })();

	}else {
	    return x;
	}

    })();
};
function copy(x,n) {
    return (function(){
	if ((!pair_Q_(x))) {
	    return x;

	} else if (var_Q_(x)) {
	    return AppendInefficient(x,n);

	}else {
	    return cons(copy(car(x),n),copy(cdr(x),n));
	}

    })();
};
function bind(x,y,e) {
    return cons(list(x,y),e);
};
function unify(x1,y1,e) {
    return (function(x=value(x1,e),y=value(y1,e)) {
	return (function(){
	    if (eq_Q_(x,y)) {
		return e;

	    } else if (var_Q_(x)) {
		return bind(x,y,e);

	    } else if (var_Q_(y)) {
		return bind(y,x,e);

	    } else if ((!pair_Q_(x)) || (!pair_Q_(y))) {
		return false;

	    }else {
		return (function(e_A_=unify(car(x),car(y),e)) {
		    return e_A_ && unify(cdr(x),cdr(y),e_A_);

		})();
	    }

	})();

    })();
};
function resolve(x,e) {
    return (function(){
	if ((!pair_Q_(x))) {
	    return x;

	} else if (var_Q_(x)) {
	    return (function(v=value(x,e)) {
		return (function(){
		    if (var_Q_(v)) {
			return v;
		    } else {
			return resolve(v,e);
		    }
		})();

	    })();

	}else {
	    return cons(resolve(car(x),e),resolve(cdr(x),e));
	}

    })();
};
function has_bindings_Q_(ee) {
    return pair_Q_(cdr(ee));
};
function get_var_name_from_binding(ee) {
    return cadaar(ee);
};
function get_binding_value_from_binding(ee,e) {
    return resolve(caar(ee),e);
};
function no_timestamp_binding_Q_(ee) {
    return null_Q_(time(caar(ee)));
};
function get_rest_of_bindings(ee) {
    return cdr(ee);
};
function print_frame_helper(ee,all_bindings,accumulator) {
    return (function(){
	if (has_bindings_Q_(ee)) {
	    return (function(var_name=get_var_name_from_binding(ee),binding_value=get_binding_value_from_binding(ee,all_bindings),remaining_bindings=get_rest_of_bindings(ee)) {
		return (function(){
		    if (no_timestamp_binding_Q_(ee)) {
			return print_frame_helper(remaining_bindings,all_bindings,cons(cons(var_name,binding_value),accumulator));

		    }else {
			return print_frame_helper(remaining_bindings,all_bindings,accumulator);
		    }

		})();

	    })();

	}else {
	    return accumulator;
	}

    })();
};
function print_frame(e) {
    return (function(final_result=print_frame_helper(e,e,list())) {
	return final_result;

    })();
};

function resolveArgs(a,bindings) {
    return resolveArgsHelper(a,list(),bindings);
};
function resolveArgsHelper(args,accumulator,bindings) {
    return (function(){
	if (null_Q_(args)) {
	    return accumulator;

	}else {
	    return resolveArgsHelper(cdr(args),AppendInefficient(accumulator,list(value(car(args),bindings))),bindings);
	}

    })();
};
function foreign_Q_(expr) {
    return pair_Q_(expr) && string_Q_(car(expr)) && string_EQ_Q_("@",car(expr));
};

var register;
function registerAsList () {
    return new list (register);
}

function call_foreign(expr,bindings) {
    return (function(func=cadr(expr),args=cddr(expr)) {
	return (function(){
	    if (string_EQ_Q_("unity",func)) {
		return car(args);

	    } else if (string_EQ_Q_("add",func)) {
		return (function(resolved_args=resolveArgs(args,bindings)) {
		    return _plus(car(resolved_args),cadr(resolved_args));

		})();

	    } else if (string_EQ_Q_("display",func)) {
		return (function(a=value(car(args),bindings)) {
		    return display(a);

		})();

	    } else if (string_EQ_Q_("newline",func)) {
		return newline();


// <hack>
	    } else if (string_EQ_Q_ ("newFact", func)) {
		var resolved_args=resolveArgs(args,bindings);
		return newFact(resolved_args);
// </hack>

	    }else {
		return error("call_foreign called with unknown operator",func);
	    }

	})();

    })();
};
var db = list ();

function clearDB () { db = list (); };
// facts can be pushed in any order (cons results in reverse order)
function pushDB (x) { db = cons (x, db); };
// rules must be kept in order, so we use the less-efficient Append instead of Cons
function appendDB (x) { db = AppendInefficient (db, list(x)); };
function lvar (s) { return list ("?",s); };
function fact0 (r) { pushDB (list (list (r))); }
function fact1 (r,s) { pushDB (list (list (r, car(s)))); }
function fact2 (r,s,o) { pushDB (list (list (r,car(s),car(o)))); }
function rule (head, bod) {
    // make multiple rules, one for each body clause: cons(head,clause)
    // head is a Cons()
    // body is an array of Cons()
    var rle;
    rle = cons (head, bod);
    appendDB (rle);
    return "nil";
};
function lvar (letter) { return list ("?", letter); };
function succeed () { return list (); };
function cut () { return "!"; };
function fail () { return "fail"; };
////
function query (goal) {
    prove6 (list (), goal, db, empty, 1, list (), db);
    var r = get_result ();
    return r;
}

var functor0 = list;
var functor1 = list;
var functor2 = list;
var head = list;
var body = list;
var goal = list;

var fact = fact2;
var _ = true;


function make_fb1 () {
fact ("rect", functor0 ("id0"), functor0 (_));
fact ("rect-x", functor0 ("id0"), functor0 (40));
fact ("rect-y", functor0 ("id0"), functor0 (120));
fact ("rect-w", functor0 ("id0"), functor0 (150));
fact ("rect-h", functor0 ("id0"), functor0 (60));
fact ("rect", functor0 ("id1"), functor0 (_));
fact ("rect-x", functor0 ("id1"), functor0 (40));
fact ("rect-y", functor0 ("id1"), functor0 (320));
fact ("rect-w", functor0 ("id1"), functor0 (150));
fact ("rect-h", functor0 ("id1"), functor0 (60));
fact ("rect", functor0 ("id2"), functor0 (_));
fact ("rect-x", functor0 ("id2"), functor0 (280));
fact ("rect-y", functor0 ("id2"), functor0 (120));
fact ("rect-w", functor0 ("id2"), functor0 (250));
fact ("rect-h", functor0 ("id2"), functor0 (130));
fact ("rect", functor0 ("id3"), functor0 (_));
fact ("rect-x", functor0 ("id3"), functor0 (650));
fact ("rect-y", functor0 ("id3"), functor0 (120));
fact ("rect-w", functor0 ("id3"), functor0 (150));
fact ("rect-h", functor0 ("id3"), functor0 (60));
fact ("rect", functor0 ("id4"), functor0 (_));
fact ("rect-x", functor0 ("id4"), functor0 (650));
fact ("rect-y", functor0 ("id4"), functor0 (270));
fact ("rect-w", functor0 ("id4"), functor0 (150));
fact ("rect-h", functor0 ("id4"), functor0 (60));
fact ("rect", functor0 ("id5"), functor0 (_));
fact ("rect-x", functor0 ("id5"), functor0 (650));
fact ("rect-y", functor0 ("id5"), functor0 (360));
fact ("rect-w", functor0 ("id5"), functor0 (150));
fact ("rect-h", functor0 ("id5"), functor0 (60));
fact ("rect", functor0 ("id6"), functor0 (_));
fact ("rect-x", functor0 ("id6"), functor0 (650));
fact ("rect-y", functor0 ("id6"), functor0 (440));
fact ("rect-w", functor0 ("id6"), functor0 (150));
fact ("rect-h", functor0 ("id6"), functor0 (60));
};

function make_fb2 (){
fact ("text", functor0 ("id7"), functor0 (_));
fact ("text-x", functor0 ("id7"), functor0 (50));
fact ("text-y", functor0 ("id7"), functor0 (150));
fact ("text-font", functor0 ("id7"), functor0 (12));
fact ("text-text", functor0 ("id7"), functor0 ("FileSelector"));
};

var newFacts = list ();
function newFact (factAsList) {
    newFacts = cons (factAsList, newFacts);
};

function execQuery () {
    clearDB();
    var _ = true;
    make_fb1();
    var g = goal (
	list ("rect", lvar ("ID") , _),
	list ("rect-x", lvar ("ID"), lvar ("X") ),
	list ("rect-y", lvar ("ID"), lvar ("Y") ),
	list ("rect-w", lvar ("ID"), lvar ("W") ),
	list ("rect-h", lvar ("ID"), lvar ("H") ),
	list ("@", "newFact", "bb-left", lvar ("X")),
	list ("@", "newFact", "bb-right", list ("@", "add", lvar ("X"), lvar ("W"))),
	list ("@", "newFact", "bb-top", lvar ("Y")),
	list ("@", "newFact", "bb-bottom", list ("@", "add", lvar ("Y"), lvar ("H")))
    );
    var result = query (g);
    return result;
}

var q = execQuery ();
console.log ("... new facts ...");
console.log (newFacts.toString ());

