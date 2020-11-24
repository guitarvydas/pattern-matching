const commentGrammar = `
comment {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = Comment | BasicToken
     Comment = SlashSlashToken ("," AnyBasicTokenExceptNewline)*
     SlashSlashToken = FirstSlashToken "," SlashToken 
       FirstSlashToken = "{" GVERYBASICKIND "," slashChar "," Line "," Column "}"
       SlashToken = "{" GVERYBASICKIND "," slashChar "," Line "," Column "}"
       AnyBasicTokenExceptNewline = ~NewlineToken BasicToken

     slashChar = quote "text" quote ":" quote "/" quote

BASICGRAMMAR()

   }
`;

const commentSemantics = {
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.comment ();
	var t2array = token_plural.comment ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
    NewToken: function (token) { return token.comment (); },
    Comment: function (slashSlashToken, _comma, anyTokenExceptNewline_plural) {
	var first = slashSlashToken.comment ();
	var text = joinText (anyTokenExceptNewline_plural.comment ());
	return { 
	    "token" : "comment", 
	    "text" : text, 
	    "line" : first.line, 
	    "column" : first.column
	}
    },
    SlashSlashToken: function (firstSlash, _comma, _slash) {
	return firstSlash.comment ();
    },
    FirstSlashToken: function (_lbrace, SVERYBASICKIND, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : "basic",
	    'text' : "/",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    SlashToken: function (_lbrace, SVERYBASICKIND, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : "basic",
	    'text' : "/",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    AnyBasicTokenExceptNewline: function (basicToken) { return basicToken.comment (); },
    slashChar: function (_q1, _text, _q2, _colon, _q3, _slash, _q4) { return "/"; },

BASICSEMANTICS(comment)

};
