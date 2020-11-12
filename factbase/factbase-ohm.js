//
// test text
///

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

//
// grammar(s)
//

const unitySVGGrammar = `
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
htmlSVGUnity <: htmlUnity {
    bodyStuff := bodyStuffPre* svgSection bodyStuffPost*
    bodyStuffPre = ~svgHeader any
    bodyStuffPost = ~"</body>" any
    
    svgSection = svgHeader wh ">" ws* (rect | text)+ "</svg>" ws*
  
    rect = "<rect" ws* id xywh ">" ws* "</rect>" ws*
    text = "<text" ws* id xy ">" ws* htmlchar+ "</text>" ws*
    id = "id=" xstring
    xywh = xy wh
    xy = "x=" numString "y=" numString
    wh = "width=" numString "height=" numString
    htmlchar = ~">" ~"<" any
    numString = "\\"" digit+ "\\"" ws*
    xstring = "\\"" notDQuote* "\\"" ws*
    notDQuote = ~"\\"" any

    svgHeader = "<svg" ws*

    ws := " " | "\\t" | "\\n"
}
`;


const ohm = require ('ohm-js');
var grammar_namespace = ohm.grammars(unitySVGGrammar);
var gparser = grammar_namespace["htmlSVGUnity"];
const result = gparser.match (text);

if (result.succeeded ()) {
    console.log ("Ohm matching succeeded");
    var semantics = gparser.createSemantics ();
    addUnitySVG (semantics);
    console.log ('svg unitySVG ohm:');
    console.log (semantics (result).unitySVG ());
} else {
    console.log ("Ohm matching failed");
}

function addUnitySVG (semantics) {
    semantics.addOperation (
	'unitySVG',
	{
	    html: function (ws_plural, htmlElement, headerStuff, bodyElement, bodyStuff, bodyElementEnd, htmlEnd) { return ws_plural.unitySVG ().join ('') + htmlElement.unitySVG () + headerStuff.unitySVG () +
														    bodyElement.unitySVG () + bodyStuff.unitySVG () + bodyElementEnd.unitySVG () + htmlEnd.unitySVG (); },
	    htmlElement: function (html, ws_plural) { return html.unitySVG () + ws_plural.unitySVG ().join('');},
	    headerStuff: function (notBody_plural) { return notBody_plural.unitySVG ().join(''); },
	    bodyElement: function (body, ws_plural) { return body.unitySVG () + ws_plural.unitySVG ().join (''); },
	    notBody: function (any) { return any.unitySVG (); },
	    notBodyEnd: function (any) { return any.unitySVG (); },
	    bodyElementEnd: function (slash_body, ws_plural) { return slash_body.unitySVG () + ws_plural.unitySVG ().join (''); },
	    htmlEnd: function (slash_html, ws_plural) { return slash_html.unitySVG () + ws_plural.unitySVG ().join (''); },
	    ws: function (c) { return c.unitySVG (); },

// additions / overriden for SVG
	    bodyStuff: function (bodyStuffPre_plural, svgSection, bodyStuffPost_plural) {},
	    bodyStuffPre: function (any) {},
	    bodyStuffPost: function (any) {},
	    svgSection: function (svgHeader, wh, _gt, ws2_plural, rectOrText_plural, _slash_scg, ws2_plural) {},
	    rect: function (_rect, ws1_plural, id, xywh, _gt, ws2_plural, _slash_rect, ws3_plural) {},
	    text: function (_text, ws1_plural, id, xy, _gt, ws2_plural, htmlchar_pural, _slashtext, ws3_plural) {},
	    id: function (_id, str) {},
	    xywh: function (xy, wh) {},
	    xy: function (_x, n, _y, n2) {},
	    wh: function (_width, n, _height, n2) {},
	    htmlchar: function (any) {},
	    numString: function (_q1, digit_plural, _q2, ws_plural) {},
	    xstring: function (_q1, notDQuote_plural, _q2, ws_plural) {},
	    notDQuote: function (any) {},
	    svgHeader: function (_svg, any) {},
	    
	    ws: function (c) { return c.unitySVG (); },

	    _terminal: function() { return this.primitiveValue; }
	}
    );};
