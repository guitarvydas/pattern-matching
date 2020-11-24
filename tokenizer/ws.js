







const wsGrammar = `
ws {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = WSrun | basicToken

    // whitespace
    WSrun = firstWhitespaceToken ("," whitespaceToken)*
    firstWhitespaceToken = whitespaceToken
    whitespaceToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," 
        quote "text" quote ":" quote whitespace quote 
        "," line "," column "}"
    whitespace = " " | "\\n" | "\\r" | "\\t"
    // end whitespace


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

const wsSemantics = {
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.ws ();
	var t2array = token_plural.ws ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
    NewToken: function (token) { return token.ws (); },

    // whitespace
    WSrun: function (firstWhitespaceToken, _comma, whitespaceToken_plural) {
	return firstWhitespaceToken.ws ();
    },
    firstWhitespaceToken: function (token) { return token.ws (); },
    whitespaceToken: function (_lbrace, _1,_2,_3,_4,_5,_6,_7, _comma1,
			       _q1, text, _q2, _colon, _q3, whitespace, _q4,
			       _comma2, line, _comma3, column, _rbrace) {
	return { 
	    "token": "ws",
	    "text" : " ",
	    "line" : line.ws (),
	    "column" : column.ws ()
	}
    },
    whitespace: function (c) { return c.ws (); },
    // end whitespace


    
    NewlineToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, _newlinetext, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : "ws",
	    'text' : "\n",
	    'line' : line.ws (),
	    'column' : column.ws ()
	}
    },
    basicToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : identifier.ws (),
	    'text' : c.ws (),
	    'line' : line.ws (),
	    'column' : column.ws ()
	}
    },
    line: function (_q1, _line, _q2, _colon, integer) { return integer.ws (); },
    column: function (_q1, _column, _q2, _colon, integer) { return integer.ws (); },

    integer: function (num_plural) { return parseInt (num_plural.ws ().join ('')); },
    num: function (n) { return n.ws (); },
    char: function (c) { return c.ws (); },
    simpleChar: function (c) { return c.ws (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.ws ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    text: function (_q1, _text, _q2, _colon, _q3, c_plural, _q4) { return c_plural.ws ().join (''); },
    AnyKind: function (_q1, _kind, _q2, _colon, _q3, identifier, _q4) { return identifier.ws (); },
    newlinetext: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    identifier: function (firstChar, followChar_plural) { 
	return firstChar.ws () + followChar_plural.ws ().join ('');
    },
    firstChar: function (c) { return c.ws (); },
    followChar: function (c) { return c.ws (); },
    

    _terminal: function() { return this.primitiveValue; }


};
