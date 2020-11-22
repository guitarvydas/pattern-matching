const basicSemantics = {    
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.comment ();
	var t2array = token_plural.comment ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
    NewlineToken: function (_lbrace, basicKind, _comma1, _newlineChar, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : basicKind.comment (),
	    'text' : "\n",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    BasicToken: function (_lbrace, basicKind, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.comment (),
	    'text' : c.comment (),
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    BasicTokenChar: function (_lbrace, basicKind, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.comment (),
	    'text' : c.comment (),
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    Line: function (_q1, _line, _q2, _colon, integer) { return integer.comment (); },
    Column: function (_q1, _column, _q2, _colon, integer) { return integer.comment (); },

    integer: function (num_plural) { return parseInt (num_plural.comment ().join ('')); },
    num: function (n) { return n.comment (); },
    char: function (_q1, c, _q2) { return c.comment (); },
    simpleChar: function (c) { return c.comment (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.comment ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    Text: function (_q1, _text, _q2, _colon, c) { return c.comment (); },
    BasicKind: function (_q1, _kind, _q2, _colon, _q3, _basic, _q4) { return "basic"; },
    newlineChar: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    _terminal: function() { return this.primitiveValue; }
};

