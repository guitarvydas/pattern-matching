const identGrammar = `
ident {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = Ident | basicToken

     // ident
     Ident = FirstCharToken ("," FollowCharToken)*
       FirstCharToken = "{" GONLYBASICKIND "," FirstCharText "," line "," column "}"
       FirstCharText = quote "text" quote ":" quote ("A".."Z" | "a".."z") quote
       FollowCharToken = "{" GONLYBASICKIND "," FollowCharText "," line "," column "}"
       FollowCharText = quote "text" quote ":" quote ("A".."Z" | "a".."z" | "0".."9" | "-" | "_") quote
     // end ident

BASICGRAMMAR()

   }
`;

const identSemantics = {
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.ident ();
	var t2array = token_plural.ident ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
    NewToken: function (token) { return token.ident (); },


    // Ident
    Ident: function (firstCharToken, _comma, followCharToken_plural) {
	var tokenArray = followCharToken_plural.ident ();
	tokenArray.unshift (firstCharToken.ident ());
	return {
	    "token": "ident",
	    "text" : joinText (tokenArray),
	    "line" : firstCharToken.ident ().line,
	    "column" : firstCharToken.ident ().column
	};
    },
    FirstCharToken: function (_lbrace, SONLYBASICKIND, _comma1, c, 
		     _comma2, line, _comma3, column, _rbrace) {
	return {
	    "token" : "basic",
	    "text"  : c.ident (),
	    "line"  : line.ident (),
	    "column": column.ident ()
	}
    },
    FollowCharToken: function (_lbrace, SONLYBASICKIND, _comma1, c, 
		     _comma2, line, _comma3, column, _rbrace) {
	return {
	    "token" : "basic",
	    "text"  : c.ident (),
	    "line"  : -1, // don't care
	    "column": -1  // don't care
	}
    },
    FirstCharText: function (_q1, _text, _q2, _colon, _q3, c, _q4) { return c.ident (); },
    FollowCharText: function (_q1, _text, _q2, _colon, _q3, c, _q4) { return c.ident (); },
    // end Ident

BASICSEMANTICS(ident)

};
