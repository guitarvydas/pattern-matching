const wsGrammar = `
ws {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = WSrun | basicToken

    // whitespace
    WSrun = firstWhitespaceToken ("," whitespaceToken)*
    firstWhitespaceToken = whitespaceToken
    whitespaceToken = "{" GVERYBASICKIND "," 
        quote "text" quote ":" quote whitespace quote 
        "," line "," column "}"
    whitespace = " " | "\\n" | "\\r" | "\\t"
    // end whitespace

BASICGRAMMAR()

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
    whitespaceToken: function (_lbrace, SONLYBASICKIND, _comma1,
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


    BASICSEMANTICS(ws)

};
