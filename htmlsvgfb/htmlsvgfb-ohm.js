//
// grammar that performs unity transform on HTML + SVG + factbase file (source.html)
//
// 

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
    
  <script>
fact ("rect", functor0 ("id0"), functor0 (_));
fact ("rect-x", functor0 ("id0"), functor0 (40));
fact ("rect-y", functor0 ("id0"), functor0 (120));
fact ("rect-w", functor0 ("id0"), functor0 (150));
fact ("rect-h", functor0 ("id0"), functor0 (60));
fact ("rect", functor0 ("id1"), functor0 (_));
fact ("rect-x", functor0 ("id1"), functor0 (40));
fact ("rect-y", functor0 ("id1"), functor0 (320));
fact ("rect-w", functor0 ("id1"), functor0 (150));
fact ("rect-h", functor0 ("id1"), functor0 (60));
fact ("rect", functor0 ("id2"), functor0 (_));
fact ("rect-x", functor0 ("id2"), functor0 (280));
fact ("rect-y", functor0 ("id2"), functor0 (120));
fact ("rect-w", functor0 ("id2"), functor0 (250));
fact ("rect-h", functor0 ("id2"), functor0 (130));
fact ("rect", functor0 ("id3"), functor0 (_));
fact ("rect-x", functor0 ("id3"), functor0 (650));
fact ("rect-y", functor0 ("id3"), functor0 (120));
fact ("rect-w", functor0 ("id3"), functor0 (150));
fact ("rect-h", functor0 ("id3"), functor0 (60));
fact ("rect", functor0 ("id4"), functor0 (_));
fact ("rect-x", functor0 ("id4"), functor0 (650));
fact ("rect-y", functor0 ("id4"), functor0 (270));
fact ("rect-w", functor0 ("id4"), functor0 (150));
fact ("rect-h", functor0 ("id4"), functor0 (60));
fact ("rect", functor0 ("id5"), functor0 (_));
fact ("rect-x", functor0 ("id5"), functor0 (650));
fact ("rect-y", functor0 ("id5"), functor0 (360));
fact ("rect-w", functor0 ("id5"), functor0 (150));
fact ("rect-h", functor0 ("id5"), functor0 (60));
fact ("rect", functor0 ("id6"), functor0 (_));
fact ("rect-x", functor0 ("id6"), functor0 (650));
fact ("rect-y", functor0 ("id6"), functor0 (440));
fact ("rect-w", functor0 ("id6"), functor0 (150));
fact ("rect-h", functor0 ("id6"), functor0 (60));
fact ("text", functor0 ("id7"), functor0 (_));
fact ("text-x", functor0 ("id7"), functor0 (50));
fact ("text-y", functor0 ("id7"), functor0 (150));
fact ("text-font", functor0 ("id7"), functor0 (12));
fact ("text-text", functor0 ("id7"), functor0 ("FileSelector"));
fact ("text", functor0 ("id8"), functor0 (_));
fact ("text-x", functor0 ("id8"), functor0 (50));
fact ("text-y", functor0 ("id8"), functor0 (350));
fact ("text-font", functor0 ("id8"), functor0 (12));
fact ("text-text", functor0 ("id8"), functor0 ("TimeoutTimer"));
fact ("text", functor0 ("id9"), functor0 (_));
fact ("text-x", functor0 ("id9"), functor0 (290));
fact ("text-y", functor0 ("id9"), functor0 (185));
fact ("text-font", functor0 ("id9"), functor0 (12));
fact ("text-text", functor0 ("id9"), functor0 ("CallbackLogic"));
fact ("text", functor0 ("id10"), functor0 (_));
fact ("text-x", functor0 ("id10"), functor0 (660));
fact ("text-y", functor0 ("id10"), functor0 (150));
fact ("text-font", functor0 ("id10"), functor0 (12));
fact ("text-text", functor0 ("id10"), functor0 ("Display"));
fact ("text", functor0 ("id11"), functor0 (_));
fact ("text-x", functor0 ("id11"), functor0 (660));
fact ("text-y", functor0 ("id11"), functor0 (320));
fact ("text-font", functor0 ("id11"), functor0 (12));
fact ("text-text", functor0 ("id11"), functor0 ("ErrorHandler"));
fact ("text", functor0 ("id12"), functor0 (_));
fact ("text-x", functor0 ("id12"), functor0 (660));
fact ("text-y", functor0 ("id12"), functor0 (410));
fact ("text-font", functor0 ("id12"), functor0 (12));
fact ("text-text", functor0 ("id12"), functor0 ("AbortHandler"));
fact ("text", functor0 ("id13"), functor0 (_));
fact ("text-x", functor0 ("id13"), functor0 (660));
fact ("text-y", functor0 ("id13"), functor0 (490));
fact ("text-font", functor0 ("id13"), functor0 (12));
fact ("text-text", functor0 ("id13"), functor0 ("NoResponseHandler"));
</script>
</body>
</html>
`;

const unityHTMLSVGFBGrammar = `
htmlsvgfbUnity {
    html = ws* htmlElement headerStuff bodyElement bodyStuff factbase bodyElementEnd htmlEnd
    htmlElement = "<html>" ws*
    headerStuff = notBody*
    notBody = ~"<body>" any
    bodyElement = "<body>" ws*
    bodyStuff = (~"<script>" any)*

    factbase = "<script>" ws* fact+ "</script>" ws*
    fact = "fact" ws* "(" string "," ws* subject "," ws* object ");" ws*
    subject = "functor0" ws* "(" string ws* ")" ws*
    object = "functor0" ws* "(" (string | integer | "_") ws* ")" ws*

    bodyElementEnd = "</body>" ws*
    htmlEnd = "</html>" ws*
    ws = " " | "\\t" | "\\n"

    string = "\\"" notDQuote* "\\""
    notDQuote = ~"\\"" any

    integer = ("0".."9")+
}
`;


const ohm = require ('ohm-js');
const ohmParser = ohm.grammar (unityHTMLSVGFBGrammar);
const result = ohmParser.match (text);

if (result.succeeded ()) {
    console.log ("Ohm matching succeeded");
    var semantics = ohmParser.createSemantics ();
    addUnity (semantics);
    console.log (semantics (result).unity ());
} else {
    console.log ("Ohm matching failed");
}

function addUnity (semantics) {
    semantics.addOperation (
	'unity',
	{
            html: function (ws_plural, htmlElement, headerStuff,bodyElement,bodyStuff,factbase,bodyElementEnd,htmlEnd) {
		return ws_plural.unity ().join ('') + 
		    htmlElement.unity () + 
		    headerStuff.unity () +
		    bodyElement.unity () +
		    bodyStuff.unity () +
		    factbase.unity () +
		    bodyElementEnd.unity () +
		    htmlEnd.unity ();
	    },
	    htmlElement: function (_html,ws_plural) { return "<html>" + ws_plural.unity ().join (''); },
	    headerStuff: function (notBody_plural) { return notBody_plural.unity ().join (''); },
	    notBody: function (any) { return any.unity (); },
	    bodyElement: function (_body,ws_plural) {
		return "<body>" + ws_plural.unity ().join ('');
	    },
	    bodyStuff: function (any_plural) {
		return any_plural.unity ().join ('');
	    },

	    factbase: function (_script,ws1_plural,fact_plural,_slashScript,ws2_plural) {
		return "<script>" +
		    ws1_plural.unity ().join ('') +
		    fact_plural.unity ().join ('') +
		    "</script>" +
		    ws2_plural.unity ().join ('');
	    },
	    fact: function (_fact,ws1_plural,_lpar,str,_comma1,ws2_plural,subject,_comma2,ws3_plural,object,_rparSemiColon,ws4_plural) {
		return "fact" + 
		    ws1_plural.unity ().join ('') +
		    "(" +
		    str.unity () +
		    "," +
		    ws2_plural.unity ().join ('') +
		    subject.unity () +
		    "," +
		    ws3_plural.unity ().join ('') +
		    object.unity () +
		    ");" +
		    ws4_plural.unity ().join ('');
	},
	    subject: function (_functor0,ws1_plural,_lpar,str,ws2_plural,_rpar,ws3_plural) {
		return "functor0" +
		    ws1_plural.unity ().join ('') +
		    "(" +
		    str.unity () +
		    ws2_plural.unity ().join ('') +
		    ")" +
		    ws3_plural.unity ().join ('');
	    },
	    object: function (_functor0,ws1_plural,_lpar,strOrIntegerOrUnderscore,ws2_plural,_rpar,ws3_plural) {
		return "functor0" +
		    ws1_plural.unity ().join ('') +
		    "(" +
		    strOrIntegerOrUnderscore.unity () +
		    ws2_plural.unity ().join ('') +
		    ")" +
		    ws3_plural.unity ().join ('');
	    },

	    bodyElementEnd: function (_slashBody,ws_plural) {return "</body>" + ws_plural.unity ().join (''); },
	    htmlEnd: function (_slashHTML,ws_plural) { return "</html>" + ws_plural.unity ().join (''); },
	    ws: function (c) { return c.unity (); },

	    string: function (_dq1, notDQuote_plural, _dq2) { return '"' + notDQuote_plural.unity ().join ('') + '"'},
	    notDQuote: function (any) { return any.unity (); },

	    integer: function (digit_plural) { return digit_plural.unity ().join (''); },

	    _terminal: function() { return this.primitiveValue; }
	});
}
