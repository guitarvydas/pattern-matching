const hold_commentGrammar = basicGrammar + 
  `
  comment <: basic {
     TokenArray = "[" Token ("," Token)* "]"
     Token = BasicToken
     Comment = SlashSlashToken ("," AnyTokenExceptNewline)*
     SlashSlashToken = FirstSlashToken "," SlashToken 
       FirstSlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       SlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       AnyTokenExceptNewline = ~NewlineToken BasicToken

     slashChar = quote "text" quote ":" quote "/" quote
   }
`;

const commentGrammar = `
  comment {
     TokenArray = "[" Token ("," Token)* "]"
     Token = Comment | BasicToken
     Comment = SlashSlashToken ("," AnyTokenExceptNewline)*
     SlashSlashToken = FirstSlashToken "," SlashToken 
       FirstSlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       SlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       AnyTokenExceptNewline = ~NewlineToken BasicToken

     slashChar = quote "text" quote ":" quote "/" quote

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

     identifier = firstChar followChar*
     firstChar = "A".."Z" | "a".."z"
     followChar = "A".."Z" | "a".."z" | "0".."9" | "-" | "_"

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

	
    // include basicSemantics
    ,
    NewlineToken: function (_lbrace, basicKind, _comma1, _newlineChar, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : basicKind.basic (),
	    'text' : "\n",
	    'line' : line.basic (),
	    'column' : column.basic ()
	}
    },
    BasicToken: function (_lbrace, basicKind, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.basic (),
	    'text' : c.basic (),
	    'line' : line.basic (),
	    'column' : column.basic ()
	}
    },
    BasicTokenChar: function (_lbrace, basicKind, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.basic (),
	    'text' : c.basic (),
	    'line' : line.basic (),
	    'column' : column.basic ()
	}
    },
    Line: function (_q1, _line, _q2, _colon, integer) { return integer.basic (); },
    Column: function (_q1, _column, _q2, _colon, integer) { return integer.basic (); },

    integer: function (num_plural) { return parseInt (num_plural.basic ().join ('')); },
    num: function (n) { return n.basic (); },
    char: function (_q1, c, _q2) { return c.basic (); },
    simpleChar: function (c) { return c.basic (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.basic ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    Text: function (_q1, _text, _q2, _colon, c) { return c.basic (); },
    BasicKind: function (_q1, _kind, _q2, _colon, _q3, _basic, _q4) { return "basic"; },
    newlineChar: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    identifier: function (firstChar, followChar_plural) { 
	return firstChar.string () + followChar_plural.basic ().join ('');
    },
    firstChar: function (c) { return c.basic (); },
    followChar: function (c) { return c.basic (); },
    

    _terminal: function() { return this.primitiveValue; }
    
};
