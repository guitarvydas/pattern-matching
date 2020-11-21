const text = `
<html>
  <title>Top</title>
  <head>
    <style>
      rect { fill:#DAE8FC }
    </style>
  </head>
  <body>
    
    <h1>Top Part (Schematic)</h1>
    
    <svg width="800" height="800">
      <rect id="id0" x="40" y="120" width="150" height="60"></rect>
      <rect id="id1" x="40" y="320" width="150" height="60"></rect>
      <rect id="id2" x="280" y="120" width="250" height="130"></rect>
      <rect id="id3" x="650" y="120" width="150" height="60"></rect>
      <rect id="id4" x="650" y="270" width="150" height="60"></rect>
      <rect id="id5" x="650" y="360" width="150" height="60"></rect>
      <rect id="id6" x="650" y="440" width="150" height="60"></rect>
      
      <text id="id7" x="50" y="150">FileSelector</text>
      <text id="id8" x="50" y="350">TimeoutTimer</text>
      <text id="id9" x="290" y="185">CallbackLogic</text>
      <text id="id10" x="660" y="150">Display</text>
      <text id="id11" x="660" y="320">ErrorHandler</text>
      <text id="id12" x="660" y="410">AbortHandler</text>
      <text id="id13" x="660" y="490">NoResponseHandler</text>

    </svg>
    
  </body>
</html>
`;


const ohm = require ('ohm-js');

function makeToken (kind, s, line, column) {
    var token = { 'token' : kind, 'text' : s, 'line' : line, 'column' : column };
    return token;
};

var columnNumber;
var lineNumber;
var basicColumnNumber;
var basicLineNumber;

function tokenParser (grammar, semanticsName, semanticsFunctions) {
    this.semanticsName = semanticsName;
    this.semanticsFunctions = semanticsFunctions;

    this.parse = function (text) {
	this.parser = ohm.grammar (grammar);
	this.result = this.parser.match (text);
	
	if (this.result.succeeded ()) {
	    basicLineNumber = 1;
	    basicColumnNumber = 1;
	    if (undefined != this.semanticsFunctions) {
		var semantics = this.parser.createSemantics ();
		semantics.addOperation (this.semanticsName, this.semanticsFunctions);
		this.sem = (semantics (this.result))[semanticsName] ();
		return this.sem;
	    } else {
		return this.result.toString ();
	    }
	} else {
	    console.log ("parse failed");
	}
    }
}

function stringify (tokenArray) {
    return tokenArray.map ( token => JSON.stringify (token) );
};

const basicGrammar =
    `tokens {
	tokens = basicToken+
	basicToken = newline | character
	newline = "\\n"
	character = any
    }`;

const basicSemantics = {
    tokens: function (token_plural) { 
	return stringify (token_plural.tokenize ());
    },
    basicToken: function (b) { return b.tokenize (); },
    newline: function (nl) {
	var result = makeToken ("basic", "\n", basicLineNumber, basicColumnNumber);
	basicLineNumber += 1;
	basicColumnNumber = 1;
	return result;
    },
    character: function (c) {
	var result = makeToken ("basic", c.tokenize (), basicLineNumber, basicColumnNumber);
	basicColumnNumber += 1;
	return result;
    },
    _terminal: function() { return this.primitiveValue; }
};

const commentGrammar =
  `
   comments {
     Tokens = (CommentToken | BasicToken)+
     BasicToken = "{" BasicKind "," Text "," Line "," Column "}"
     CommentToken = SlashSlashToken AnyTokenExceptNewline*
       SlashSlashToken = FirstSlashToken SlashToken 
       NewlineToken = "{" BasicKind "," newlineChar "," Line "," Column "}"
       FirstSlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       SlashToken = "{" BasicKind "," slashChar "," Line "," Column "}"
       AnyTokenExceptNewline = ~NewlineToken BasicTokenChar
       BasicTokenChar = "{" BasicKind "," char "," Line "," Column "}"
     BasicKind = quote "token" quote ":" quote "basic" quote
     Line = quote "line" quote ":" integer
     Column = quote "column" quote ":" integer

     quote = "\\""
     Text = quote "text" quote ":" char
     
     integer = num+
     num = "0" .. "9"
     char = quote (escapedChar | simpleChar) quote
     escapedChar = "\\\\" any
     simpleChar = any
     newlineChar = quote "text" quote ":" "'" "\\n" "'"
     slashChar = quote "text" quote ":" quote "/" quote
   }
`;

const commentSemantics = {
    Tokens: function (token_plural) {
	return token_plural.comment ().join (''); 
    },
    CommentToken: function (slashSlashToken, anyTokenExceptNewline_plural) {
	var first = slashSlashToken.comment ();
	var text = anyTokenExceptNewline_plural.comment ().join ('');
	return { "token" : "comment", "text" : text, "line" : first.line (), "column" : first.column };
    },
    NewlineToken: function (_lbrace, basicKind, _comma1, _newlineChar, _comma2, line, _comma3, column, _rbrace) { 
	return { 
	    'token' : basicKind.comment (),
	    'text' : "\n",
	    'line' : line.comment (),
	    'column' : column.comment ()
	}
    },
    SlashSlashToken: function (firstSlash, _slash) {
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
    Text: function (_q1, _text, _q2, _colon, c) { return c.comment (); },
    BasicKind: function (_q1, _kind, _q2, _colon, _q3, _basic, _q4) { return "basic"; },
    newlineChar: function (_q1, _text, _q2, _colon, _q3, _newline, _q4) { return "\n"; },
    slashChar: function (_q1, _text, _q2, _colon, _q3, _slash, _q4) { return "/"; },

    _terminal: function() { return this.primitiveValue; }
};

const stringGrammar =
  `comments {
     Tokens = (StringToken | Token)+
     Token = "token" Kind text Line Column
     StringToken = FirstStringDelimiterToken AnyTokenExceptStringDelimiter* StringDelimiterToken
  
     Kind = KindIdentifier

     FirstStringDelimiterToken = StringDelimiterToken
     StringDelimiterToken = "token" Kind stringDelimiter Line Column

     KindIdentifier = ~Keyword FirstCharToken FollowCharToken*
     FirstCharToken = "token" Kind firstChar Line Column
     FollowCharToken = "token" Kind followChar Line Column
     firstChar = "A" .. "Z" | "a" .. "z"
     followChar = "0".."9" | "-" | "_" | firstChar

     text = "'" (~"'" any)* "'"

     stringDelimiter = "'"
     AnyTokenExceptStringDelimiter = ~StringDelimiterToken Token

     Keyword = "token"

     Line = integer
     Column = integer
     integer = num+
     num = "0" .. "9"
     char = "'" any "'"
     newlineChar = "'" "\\n" "'"
     slashChar = "'" "/" "'"

  }`;

const stringSemantics = {
    Tokens: function (token_plural) { return token_plural.string ().join (''); },
    Token: function (_token, kind, text, line, column) {
	return "token " + kind.string () + text.string () + line.string () + column.string ();
    },
    StringToken: function (firstStringDelimiterToken, anyTokenExceptStringDelimiter_plural, _stringDelimiterToken2) {
	var lineCol = firstStringDelimiterToken.string ();
	var text = anyTokenExceptStringDelimiter_plural.string ().join ('')
	return makeToken ("string", text, lineCol.line, lineCol.column);
    },
    Kind: function (kindIdentifier) { return kindIdentifier.string (); },
    FirstStringDelimiterToken: function (stringDelimiterToken) {
	return stringDelimiterToken.string ();
    },
    StringDelimiterToken: function (_token, kind, stringDelimiter, line, column) {
	return { 'line': line, 'column': column };
    },
    KindIdentifier: function (firstCharToken, followCharToken_plural) {
	return firstChar.string () + followChar_plural.string ().join ('');
    },
    FirstCharToken: function (_token, _kind, c, line, column) {
	lineNumber = line;
	columnNumber = column;
	return c.string ();
    },
    FollowCharToken: function (_token, _kind, c, line, column) {
	return c.string ();
    },
    firstChar: function (c) { return c.string (); },
    followChar: function (c) { return c.string (); },
    text: function (_q1, any_pural, _q2) { return any_plural.string ().join (''); },
    stringDelimiter: function (_q) { return '"'; },
    AnyTokenExceptStringDelimiter: function (token) { return token.string (); },

    Line: function (integer) { return integer.comment (); },
    Column: function (integer) { return integer.comment (); },
    integer: function (num_plural) { return parseInt (num_plural.comment ().join ('')); },
    num: function (n) { return n.comment (); },
    char: function (_q1, c, _q2) { return c.comment (); },
    newlineChar: function (_q1, _c, _q2) { return "\n"; },
    slashChar: function (_q1, _slash, _q2) { return "/"; },
    _terminal: function() { return this.primitiveValue; }
};    


var p1 = new tokenParser ( basicGrammar, 'tokenize', basicSemantics );
var p2 = new tokenParser ( commentGrammar, 'comment', commentSemantics );
var p3 = new tokenParser ( stringGrammar, 'string', stringSemantics );

console.log ("1:");
console.log (
	p1.parse ("a\n//comment\ndef\n")
	//p1.parse ("a")
);
console.log ("2:");
console.log (
    p2.parse (
	//p1.parse ("a\n//comment\ndef\n")
	p1.parse ("a")
    )
);
console.log ("3:");
console.log (
    p3.parse (
	p2.parse (
	    //p1.parse ("a\n//comment\ndef\n")
	    p1.parse ("a")
	)
    )
);

