const commentGrammar =
  `
  basic {
     TokenArray = "[" Token ("," Token)* "]"
     Token = BasicToken
     BasicToken = "{" BasicKind "," Text "," Line "," Column "}"
       NewlineToken = "{" BasicKind "," newlineChar "," Line "," Column "}"
       BasicTokenChar = "{" BasicKind "," char "," Line "," Column "}"
     BasicKind = quote "token" quote ":" quote "basic" quote
     Line = quote "line" quote ":" integer
     Column = quote "column" quote ":" integer

     quote = "\\""
     Text = quote "text" quote ":" char
     
     integer = num+
     num = "0" .. "9"
     char = quote (escapedChar | simpleChar) quote
     escapeChar = "\\\\"
     escapedChar = escapeChar any
     simpleChar = any
     newlineChar = quote "text" quote ":" quote escapeChar "n" quote
   }
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
    TokenArray: function (_lbracket, token, _comma, token_plural, _rbracket) {
	var t1 = token.comment ();
	var t2array = token_plural.comment ();
	t2array.unshift (t1);
	return JSON.stringify (t2array);
    },
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
    NewlineToken: function (_lbrace, basicKind, _comma1, _newlineChar, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : basicKind.comment (),
	    'text' : "\n",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    SlashSlashToken: function (firstSlash, _comma, _slash) {
	return firstSlash.comment ();
    },
    BasicToken: function (_lbrace, basicKind, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.comment (),
	    'text' : c.comment (),
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    BasicTokenChar: function (_lbrace, basicKind, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.comment (),
	    'text' : c.comment (),
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
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
    Line: function (_q1, _line, _q2, _colon, integer) { return integer.comment (); },
    Column: function (_q1, _column, _q2, _colon, integer) { return integer.comment (); },

    integer: function (num_plural) { return parseInt (num_plural.comment ().join ('')); },
    num: function (n) { return n.comment (); },
    char: function (_q1, c, _q2) { return c.comment (); },
    simpleChar: function (c) { return c.comment (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.comment ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    Text: function (_q1, _text, _q2, _colon, c) { return c.comment (); },
    BasicKind: function (_q1, _kind, _q2, _colon, _q3, _basic, _q4) { return "basic"; },
    newlineChar: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },
    slashChar: function (_q1, _text, _q2, _colon, _q3, _slash, _q4) { return "/"; },

    _terminal: function() { return this.primitiveValue; }
};

