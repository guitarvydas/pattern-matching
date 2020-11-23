const stringGrammar = basicGrammar + `
strings <: basic {
     Token := BasicToken
     StringToken = FirstStringDelimiterToken AnyTokenExceptStringDelimiter* StringDelimiterToken
  
       Kind = quote "token" quote ":" quote KindIdentifier quote
       KindIdentifier = identifier


       FirstStringDelimiterToken = StringDelimiterToken
       StringDelimiterToken = "{" Kind "," stringDelimiter "," Line "," Column "}"


       stringDelimiter = quote
       AnyTokenExceptStringDelimiter = ~StringDelimiterToken BasicToken

  }
`;

const stringSemantics = {
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.string ();
	var t2array = token_plural.string ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
    Token: function (token) { return token.string (); },
    BasicToken: function (_lbrace, basicKind, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.string (),
	    'text' : c.string (),
	    'line' : line.string (),
	    'column' : column.string ()
	}
    },

    ////////////
    StringToken: function (firstStringDelimiterToken, anyTokenExceptStringDelimiter_plural, stringDelimiterToken) {
	var text = joinText (anyTokenExceptStringDelimiter_plural.string ());
	var firstDelim = firstStringDelimiterToken.string ();
	return {
	    "token" : "string",
	    "text" : text,
	    "line" : firstDelim.line,
	    "column" : firstDelim.column
	}
    },
    Kind: function (_q1, _token, _q2, _colon, _q3, kindIdentifier, _q4) {
	return kindIdentifier.string ();
    },
    KindIdentifier: function (identifier) { return identifier.string (); },
    FirstStringDelimiterToken: function (token) {
	var tok = token.string ();
	line = tok.line;
	column = tok.column;
	return tok;
    },
    StringDelimiterToken: function (_lbrace, kind, _comma1, stringDelimiter, _comma2, line, _comma3, column, _rbrace) {
	return { "kind" : kind, "text" : stringDelimiter, "line" : line, "column" : column };
    },

    AnyTokenExceptStringDelimiter: function (basicToken) { return basicToken.string (); },

    stringDelimiter: function (c) { return c.string (); },

    /// inherited from previous semantics
    
    Line: function (_q1, _line, _q2, _colon, integer) { return integer.string (); },
    Column: function (_q1, _column, _q2, _colon, integer) { return integer.string (); },

    integer: function (num_plural) { return parseInt (num_plural.string ().join ('')); },
    num: function (n) { return n.string (); },
    char: function (_q1, c, _q2) { return c.string (); },
    simpleChar: function (c) { return c.string (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.string ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    Text: function (_q1, _text, _q2, _colon, c) { return c.string (); },
    BasicKind: function (_q1, _kind, _q2, _colon, _q3, _basic, _q4) { return "basic"; },

    _terminal: function() { return this.primitiveValue; }

};    
