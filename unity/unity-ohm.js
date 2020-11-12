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

const unityGrammar = `
htmlUnity {
    html = ws* htmlElement headerStuff bodyElement bodyStuff bodyElementEnd htmlEnd
    htmlElement = "<html>" ws*
    headerStuff = notBody*
    bodyElement = "<body>" ws*
    bodyStuff = notBodyEnd*	
    notBody = ~"<body>" any
    notBodyEnd = ~"</body>" any
    bodyElementEnd = "</body>" ws*
    htmlEnd = "</html>" ws*
    ws = " " | "\\t" | "\\n"
}
`;


const ohm = require ('ohm-js');
const ohmParser = ohm.grammar (unityGrammar);
const result = ohmParser.match (text);

if (result.succeeded ()) {
    console.log ("Ohm matching succeeded");
    var semantics = ohmParser.createSemantics ();
    addUnity (semantics);
    console.log ('example6 ohm unity:');
    console.log (semantics (result).unity ());
} else {
    console.log ("Ohm matching failed");
}

function addUnity (semantics) {
    semantics.addOperation (
	'unity',
	{
	    html: function (ws1, htmlElement, headerStuff, bodyElement, bodyStuff, bodyElementEnd, htmlEnd) {},
	    htmlElement: function (html, ws_plural) {},
	    headerStuff: function (notBody_plural) {},
	    bodyElement: function (body, ws_plural) {},
	    bodyStuff: function (notBodyEnd_plural) {},
	    notBody: function (any) {},
	    notBodyEnd: function (any) {},
	    bodyElementEnd: function (slash_body, ws_plural) {},
	    htmlEnd: function (slash_html, ws_plural) {},
	    ws: function (c) {},
	    _terminal: function() { return this.primitiveValue; }
	}
    );};
