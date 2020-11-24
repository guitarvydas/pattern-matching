const stringsGrammar = `
strings {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = String | BasicToken

     // strings
     String = FirstStringDelimToken ("," AnyTokenExceptStringDelim)* "," StringDelimToken
     StringDelimToken = "{" GVERYBASICKIND "," StringDelimText "," Line "," Column "}"
     StringDelimText = quote "text" quote ":" quote "\\\\\\"" quote
     FirstStringDelimToken = StringDelimToken
     AnyTokenExceptStringDelim = "{" GVERYBASICKIND "," AnyTextExceptStringDelim "," Line "," Column "}"
     AnyTextExceptStringDelim = quote "text" quote ":" quote (~"\\\\\\"" char) quote
     // end strings

BASICGRAMMAR()

   }
`;

const stringsSemantics = {
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.strings ();
	var t2array = token_plural.strings ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
    NewToken: function (token) { return token.strings (); },


    // String
    String: function (firstStringDelimToken, _comma, anyTokenExceptStringDelim_plural,
		      _comma2, _stringDelimToken) {
	line = firstStringDelimToken.strings ().line;
	column = firstStringDelimToken.strings ().column;
	var text = joinText (anyTokenExceptStringDelim_plural.strings ());
	return { "token" : "string", "text" : text, "line": line, "column": column };
    },
    StringDelimToken: function (_lbrace, SVERYBASICKIND, _comma1, _stringDelimText, 
				_comma2, line, _comma3, column, _rbrace) {
	return { 
	    "token" : "basic", 
	    "text" : "\"", 
	    "line" : line.strings (),
	    "column" : column.strings ()
	};
    },
    StringDelimText: function (_q1, _text, _q2, _colon, _q3, delim, _q4) { return delim.strings (); },
    FirstStringDelimToken: function (stringDelimToken) { return stringDelimToken.strings (); },

    AnyTokenExceptStringDelim: function (_lbrace, SVERYBASICKIND, _comma1, text, _comma2, line,
					 _comma3, column, _rbrace) {
	return { 
	    "token" : identifier.strings (),
	    "text": text.strings (),
	    "line" : line.strings (),
	    "column": column.strings ()
	};
    },

    AnyTextExceptStringDelim: function ( _q1, _text, _q2, _colon, _q3, c, _q4) {
	return c.strings ();
    },
    // end String

    BASICSEMANTICS(strings)

};
