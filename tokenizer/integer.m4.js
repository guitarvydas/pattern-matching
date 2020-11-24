const integerGrammar = `
integer {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = int | basicToken

    // integer
    int = firstIntegerToken ("," integerToken)*
    firstIntegerToken = integerToken
    integerToken = "{" GVERYBASICKIND "," 
        quote "text" quote ":" quote integerDigit quote 
        "," line "," column "}"
    integerDigit = "0".."9"
    // end integer

BASICGRAMMAR()

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
    integerToken: function (_lbrace, SONLYBASICKIND, _comma1,
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


    BASICSEMANTICS(integer)

};
