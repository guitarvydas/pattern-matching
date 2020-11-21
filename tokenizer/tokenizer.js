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
    return `token ${kind} '${s}' ${line} ${column}\n`;
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

const basicGrammar =
    `tokens {
	tokens = basicToken+
	basicToken = newline | character
	newline = "\\n"
	character = any
    }`;

const basicSemantics = {
    tokens: function (token_plural) { return token_plural.tokenize ().join ('');},
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
  `comments {
     Tokens = (CommentToken | BasicToken)+
     BasicToken = "token" "basic" char Line Column
     CommentToken = SlashSlashToken AnyTokenExceptNewline*
       SlashSlashToken = FirstSlashToken SlashToken 
       NewlineToken = "token" "basic" newlineChar Line Column
       FirstSlashToken = "token" "basic" slashChar Line Column
       SlashToken = "token" "basic" slashChar Line Column
       AnyTokenExceptNewline = ~NewlineToken BasicTokenChar
       BasicTokenChar = "token" "basic" char Line Column
     Line = integer
     Column = integer

     integer = num+
     num = "0" .. "9"
     char = "'" any "'"
     newlineChar = "'" "\\n" "'"
     slashChar = "'" "/" "'"
  }`;

const commentSemantics = {
    Tokens: function (token_plural) { return token_plural.comment ().join (''); },
    CommentToken: function (slashSlashToken, anyTokenExceptNewline_plural) {
	var position = slashSlashToken.comment ();
	var text = anyTokenExceptNewline_plural.comment ().join ('');
	return `token comment '${text}' ${position.line} ${position.column}\n`;
    },
    NewlineToken: function (_token, _basic, _newlineChar, line, column) { return ""; },
    SlashSlashToken: function (firstSlash, _slash) {
	return firstSlash.comment ();
    },
    BasicToken: function (_token, _basic, c, line, column) { 
	return `token basic '${c.comment ()}' ${line.comment ()} ${column.comment ()}\n`;
    },
    BasicTokenChar: function (_token, _basic, c, line, column) { 
	return c.comment ();
    },
    FirstSlashToken: function (_token, _basic, _slash, line, column) {
	return { 'line': line.comment (), 'column': column.comment () };
    },
    SlashToken: function (_token, _basic, _slash, _line, _column) { return ""; },
    AnyTokenExceptNewline: function (basicToken) { return basicToken.comment (); },
    Line: function (integer) { return integer.comment (); },
    Column: function (integer) { return integer.comment (); },
    integer: function (num_plural) { return parseInt (num_plural.comment ().join ('')); },
    num: function (n) { return n.comment (); },
    char: function (_q1, c, _q2) { return c.comment (); },
    newlineChar: function (_q1, _c, _q2) { return "\n"; },
    slashChar: function (_q1, _slash, _q2) { return "/"; },
    _terminal: function() { return this.primitiveValue; }
};

const stringGrammar =
  `comments {
     Tokens = (Token)+
     Token = "token" Kind text Line Column
     Kind = Identifier
     Line = integer
     Column = integer

     Identifier = firstChar followChar*
     FirstCharToken = "token" Kind firstChar Line Column
     FollowCharToken = "token" Kind followChar Line Column
     firstChar = "A" .. "Z" | "a" .. "z"
     followChar = "0".."9" | "-" | "_" | firstChar
     integer = num+
     num = "0" .. "9"
     char = "'" any "'"
     newlineChar = "'" "\\n" "'"
     slashChar = "'" "/" "'"
     text = "'" (~"'" any)* "'"
  }`;


var p1 = new tokenParser ( basicGrammar, 'tokenize', basicSemantics );
var p2 = new tokenParser ( commentGrammar, 'comment', commentSemantics );
var p3 = new tokenParser ( stringGrammar );

console.log (
    p3.parse (
	p2.parse (
	    p1.parse ("a\n//comment\ndef\n")
	)
    )
);

