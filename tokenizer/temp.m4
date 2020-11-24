define(`SVERYBASICKIND',`_1,_2,_3,_4,_5,identifier,_7')
define(`GVERYBASICKIND',`"\\"" "token" "\\"" ":" "\\"" identifier "\\""')
define(`SONLYBASICKIND',`_1,_2,_3,_4,_5,_6,_7')
define(`GONLYBASICKIND',`"\\"" "token" "\\"" ":" "\\"" "basic" "\\""')
changequote(<!,!>)

define(<!BASICGRAMMAR!>,<!
     basicToken = "{" GVERYBASICKIND "," text "," line "," column "}"
       NewlineToken = "{" GVERYBASICKIND "," newlinetext "," line "," column "}"
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
!>)
define(<!BASICSEMANTICS!>,<!
    NewlineToken: function (_lbrace, SVERYBASICKIND, _comma1, _newlinetext, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : "$1",
	    'text' : "\n",
	    'line' : line.$1 (),
	    'column' : column.$1 ()
	}
    },
    basicToken: function (_lbrace, SVERYBASICKIND, _comma1, c, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : identifier.$1 (),
	    'text' : c.$1 (),
	    'line' : line.$1 (),
	    'column' : column.$1 ()
	}
    },
    line: function (_q1, _line, _q2, _colon, integer) { return integer.$1 (); },
    column: function (_q1, _column, _q2, _colon, integer) { return integer.$1 (); },

    integer: function (num_plural) { return parseInt (num_plural.$1 ().join ('')); },
    num: function (n) { return n.$1 (); },
    char: function (c) { return c.$1 (); },
    simpleChar: function (c) { return c.$1 (); },
    escapedChar: function (_backSlash, any) { 
	var c = any.$1 ();
	if (c == "n") {
	    return "\n";
	} else {
	    return c;
	}
    },
    text: function (_q1, _text, _q2, _colon, _q3, c_plural, _q4) { return c_plural.$1 ().join (''); },
    AnyKind: function (_q1, _kind, _q2, _colon, _q3, identifier, _q4) { return identifier.$1 (); },
    newlinetext: function (_q1, _text, _q2, _colon, _q3, _escape, _n, _q4) { return "\n"; },

    identifier: function (firstChar, followChar_plural) { 
	return firstChar.$1 () + followChar_plural.$1 ().join ('');
    },
    firstChar: function (c) { return c.$1 (); },
    followChar: function (c) { return c.$1 (); },
    

    _terminal: function() { return this.primitiveValue; }
!>)
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
	    "offset" : firstCharToken.ident ().offset
	};
    },
    FirstCharToken: function (_lbrace, SONLYBASICKIND, _comma1, c, 
		     _comma2, line, _comma3, offset, _rbrace) {
	return {
	    "token" : "basic",
	    "text"  : c.ident (),
	    "line"  : line.ident (),
	    "offset": offset.ident ()
	}
    },
    FollowCharToken: function (_lbrace, SONLYBASICKIND, _comma1, c, 
		     _comma2, line, _comma3, offset, _rbrace) {
	return {
	    "token" : "basic",
	    "text"  : c.ident (),
	    "line"  : -1, // don't care
	    "offset": -1  // don't care
	}
    },
    FirstCharText: function (_q1, _text, _q2, _colon, _q3, c, _q4) { return c.ident (); },
    FollowCharText: function (_q1, _text, _q2, _colon, _q3, c, _q4) { return c.ident (); },
    // end Ident

BASICSEMANTICS(ident)

};
