







const commentGrammar = `
comment {
     TokenArray = "[" NewToken ("," NewToken)* "]"
     NewToken = Comment | BasicToken
     Comment = SlashSlashToken ("," AnyBasicTokenExceptNewline)*
     SlashSlashToken = FirstSlashToken "," SlashToken 
       FirstSlashToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," slashChar "," Line "," Column "}"
       SlashToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," slashChar "," Line "," Column "}"
       AnyBasicTokenExceptNewline = ~NewlineToken BasicToken

     slashChar = quote "text" quote ":" quote "/" quote


     BasicToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," Text "," Line "," Column "}"
       NewlineToken = "{" "\\"" "token" "\\"" ":" "\\"" identifier "\\"" "," newlineText "," Line "," Column "}"
     BasicKind = quote "token" quote ":" quote "basic" quote
     AnyKind = quote "token" quote ":" quote identifier quote
     Line = quote "line" quote ":" integer
     Column = quote "column" quote ":" integer

     quote = "\\""
     Text = quote "text" quote ":" quote char+ quote
     
     integer = num+
     num = "0" .. "9"
     char = escapedChar | simpleChar
     escape = "\\\\"
     escapedChar = escape any
     simpleChar = anyNotQuoteNorEscape
     anyNotQuoteNorEscape = ~quote ~escape any
     newlineText = quote "text" quote ":" quote escape "n" quote

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
    FirstSlashToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : "basic",
	    'text' : "/",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    SlashToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : "basic",
	    'text' : "/",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    AnyBasicTokenExceptNewline: function (basicToken) { return basicToken.comment (); },
    slashChar: function (_q1, _text, _q2, _colon, _q3, _slash, _q4) { return "/"; },


    NewlineToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, _newlineText, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : "comment",
	    'text' : "\n",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    BasicToken: function (_lbrace, _1,_2,_3,_4,_5,identifier,_7, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : identifier.comment (),
	    'text' : c.comment (),
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    Line: function (_q1, _line, _q2, _colon, integer) { return integer.comment (); },
    Column: function (_q1, _column, _q2, _colon, integer) { return integer.comment (); },

    integer: function (num_plural) { return parseInt (num_plural.comment ().join ('')); },
    num: function (n) { return n.comment (); },
    char: function (c) { return c.comment (); },
    simpleChar: function (c) { return c.comment (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.comment ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    Text: function (_q1, _text, _q2, _colon, _q3, c_plural, _q4) { return c_plural.comment ().join (''); },
    AnyKind: function (_q1, _kind, _q2, _colon, _q3, identifier, _q4) { return identifier.comment (); },
    newlineText: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    identifier: function (firstChar, followChar_plural) { 
	return firstChar.comment () + followChar_plural.comment ().join ('');
    },
    firstChar: function (c) { return c.comment (); },
    followChar: function (c) { return c.comment (); },
    

    _terminal: function() { return this.primitiveValue; }


};
