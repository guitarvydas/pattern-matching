const commentGrammar = basicGrammar + 
  `
  comment <: basic {
     Token := Comment | BasicToken
     Comment = SlashSlashToken ("," AnyTokenExceptNewline)*
     SlashSlashToken = FirstSlashToken "," SlashToken 
       FirstSlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       SlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       AnyTokenExceptNewline = ~NewlineToken BasicToken

     slashChar = quote "text" quote ":" quote "/" quote
   }
`;

const commentSemantics = {
    ...basicSemantics, // es6 spread operator merges object into object (basicSemantics into commentSemantics)
    Token: function (token) { return token.comment (); },
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
    FirstSlashToken: function (_lbrace, basicKind, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.comment (),
	    'text' : "/",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    SlashToken: function (_lbrace, basicKind, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.comment (),
	    'text' : "/",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    AnyTokenExceptNewline: function (basicToken) { return basicToken.comment (); },
    slashChar: function (_q1, _text, _q2, _colon, _q3, _slash, _q4) { return "/"; }
};
