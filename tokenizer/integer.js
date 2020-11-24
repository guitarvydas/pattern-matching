







const integerGrammar = `
integer {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = int | basicToken

    // integer
    int = firstIntegerToken ("," integerToken)*
    firstIntegerToken = integerToken
    integerToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," 
        quote "text" quote ":" quote integerDigit quote 
        "," line "," column "}"
    integerDigit = "0".."9"
    // end integer


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

const integerSemantics = {
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.integer ();
	var t2array = token_plural.integer ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
    NewToken: function (token) { return token.integer (); },

    // ingeger
    int: function (firstIntegerToken, _comma, integerToken_plural) {
	var tokenArray = integerToken_plural.integer ();
	tokenArray.unshift (firstIntegerToken.integer ());
	return {
	    "token" : "integer",
	    "text" : joinText (tokenArray),
	    "line" : firstIntegerToken.integer ().line,
	    "column" : firstIntegerToken.integer ().column
	}
    },
    integerToken: function (token) { return token.integer (); },
    integerToken: function (_lbrace, _1,_2,_3,_4,_5,_6,_7, _comma1,
			       _q1, text, _q2, _colon, _q3, i, _q4,
			       _comma2, line, _comma3, column, _rbrace) {
	return { 
	    "token": "integer",
	    "text" : i.integer (),
	    "line" : line.integer (),
	    "column" : column.integer ()
	}
    },
    integer: function (c) { return c.integer (); },
    // end integer


    
    NewlineToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, _newlinetext, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : "integer",
	    'text' : "\n",
	    'line' : line.integer (),
	    'column' : column.integer ()
	}
    },
    basicToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : identifier.integer (),
	    'text' : c.integer (),
	    'line' : line.integer (),
	    'column' : column.integer ()
	}
    },
    line: function (_q1, _line, _q2, _colon, integer) { return integer.integer (); },
    column: function (_q1, _column, _q2, _colon, integer) { return integer.integer (); },

    integer: function (num_plural) { return parseInt (num_plural.integer ().join ('')); },
    num: function (n) { return n.integer (); },
    char: function (c) { return c.integer (); },
    simpleChar: function (c) { return c.integer (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.integer ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    text: function (_q1, _text, _q2, _colon, _q3, c_plural, _q4) { return c_plural.integer ().join (''); },
    AnyKind: function (_q1, _kind, _q2, _colon, _q3, identifier, _q4) { return identifier.integer (); },
    newlinetext: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    identifier: function (firstChar, followChar_plural) { 
	return firstChar.integer () + followChar_plural.integer ().join ('');
    },
    firstChar: function (c) { return c.integer (); },
    followChar: function (c) { return c.integer (); },
    

    _terminal: function() { return this.primitiveValue; }


};
