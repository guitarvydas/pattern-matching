







const stringsGrammar = `
strings {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = String | basicToken

     // strings
     String = FirstStringDelimToken ("," AnyTokenExceptStringDelim)* "," StringDelimToken
     StringDelimToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," StringDelimText "," line "," column "}"
     StringDelimText = quote "text" quote ":" quote "\\\\\\"" quote
     FirstStringDelimToken = StringDelimToken
     AnyTokenExceptStringDelim = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," AnyTextExceptStringDelim "," line "," column "}"
     AnyTextExceptStringDelim = quote "text" quote ":" quote (~"\\\\\\"" char) quote
     // end strings


     basicToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," text "," line "," column "}"
       NewlineToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," newlinetext "," line "," column "}"
     BasicKind = quote "token" quote ":" quote "basic" quote
     AnyKind = quote "token" quote ":" quote identifier quote
     line = quote "line" quote ":" integer
     column = quote "column" quote ":" integer

     quote = "\\""
     text = quote "text" quote ":" quote char+ quote
     
     integer = num+
     num = "0" .. "9"
     char = escapedChar | simpleChar
     simpleChar = ~quote ~escape any
     escapedChar = ~quote escape any
     escape = "\\\\"
     newlinetext = quote "text" quote ":" quote escape "n" quote

     identifier = firstChar followChar*
     firstChar = "A".."Z" | "a".."z"
     followChar = "A".."Z" | "a".."z" | "0".."9" | "-" | "_"


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
    StringDelimToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, _stringDelimText, 
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

    AnyTokenExceptStringDelim: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, text, _comma2, line,
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

    
    NewlineToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, _newlinetext, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : "strings",
	    'text' : "\n",
	    'line' : line.strings (),
	    'column' : column.strings ()
	}
    },
    basicToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : identifier.strings (),
	    'text' : c.strings (),
	    'line' : line.strings (),
	    'column' : column.strings ()
	}
    },
    line: function (_q1, _line, _q2, _colon, integer) { return integer.strings (); },
    column: function (_q1, _column, _q2, _colon, integer) { return integer.strings (); },

    integer: function (num_plural) { return parseInt (num_plural.strings ().join ('')); },
    num: function (n) { return n.strings (); },
    char: function (c) { return c.strings (); },
    simpleChar: function (c) { return c.strings (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.strings ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    text: function (_q1, _text, _q2, _colon, _q3, c_plural, _q4) { return c_plural.strings ().join (''); },
    AnyKind: function (_q1, _kind, _q2, _colon, _q3, identifier, _q4) { return identifier.strings (); },
    newlinetext: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    identifier: function (firstChar, followChar_plural) { 
	return firstChar.strings () + followChar_plural.strings ().join ('');
    },
    firstChar: function (c) { return c.strings (); },
    followChar: function (c) { return c.strings (); },
    

    _terminal: function() { return this.primitiveValue; }


};
