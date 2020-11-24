define(<!BASICSEMANTICS!>,<!
    NewlineToken: function (_lbrace, SVERYBASICKIND, _comma1, _newlineText, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : "$1",
	    'text' : "\n",
	    'line' : line.$1 (),
	    'column' : column.$1 ()
	}
    },
    BasicToken: function (_lbrace, SVERYBASICKIND, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : identifier.$1 (),
	    'text' : c.$1 (),
	    'line' : line.$1 (),
	    'column' : column.$1 ()
	}
    },
    Line: function (_q1, _line, _q2, _colon, integer) { return integer.$1 (); },
    Column: function (_q1, _column, _q2, _colon, integer) { return integer.$1 (); },

    integer: function (num_plural) { return parseInt (num_plural.$1 ().join ('')); },
    num: function (n) { return n.$1 (); },
    char: function (c) { return c.$1 (); },
    simpleChar: function (c) { return c.$1 (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.$1 ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    Text: function (_q1, _text, _q2, _colon, _q3, c_plural, _q4) { return c_plural.$1 ().join (''); },
    AnyKind: function (_q1, _kind, _q2, _colon, _q3, identifier, _q4) { return identifier.$1 (); },
    newlineText: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    identifier: function (firstChar, followChar_plural) { 
	return firstChar.$1 () + followChar_plural.$1 ().join ('');
    },
    firstChar: function (c) { return c.$1 (); },
    followChar: function (c) { return c.$1 (); },
    

    _terminal: function() { return this.primitiveValue; }
!>)
