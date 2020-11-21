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

function tokenParse (grammar, semanticsName, semanticsFunctions) {
    const parser = ohm.grammar (grammar);
    const result = parser.match (text);
    var lineNumber;
    var columnNumber;
    
    if (result.succeeded ()) {
	lineNumber = 1;
	columnNumber = 1;
	if (undefined != semanticsFunctions) {
	    var semantics = parser.createSemantics ();
	    semantics.addOperation (semanticsName, semanticsFunctions);
	    var p = semantics (result).tokenize ();
	    return p;
	} else {
	    return result.toString ();
	}
    } else {
	console.log ("parse failed");
    }
}


var r = tokenParse (
    `tokens {
	tokens = basicToken+
	basicToken = newline | character
	newline = "\\n"
	character = any
    }`
);

console.log (r);

