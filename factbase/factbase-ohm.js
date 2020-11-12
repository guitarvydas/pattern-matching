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
    make_semantics_UnitySVG (semantics);
    make_semantics_Factbase (semantics);
    make_semantics_AddFactbaseToHTML (semantics);
    console.log ('svg unitySVG ohm:');
    console.log (semantics (result).unitySVG ());
    console.log ('add factbase ohm:');
    console.log (semantics (result).addFactbaseToHTML ());
} else {
    console.log ("Ohm matching failed");
}

function make_semantics_UnitySVG (semantics) {
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
	    bodyStuff: function (bodyStuffPre_plural, svgSection, bodyStuffPost_plural) {
		return bodyStuffPre_plural.unitySVG ().join ('') + 
		    svgSection.unitySVG () +
		    bodyStuffPost_plural.unitySVG ().join ('');
	    },
	    bodyStuffPre: function (any) { return any.unitySVG (); },
	    bodyStuffPost: function (any) { return any.unitySVG (); },
	    svgSection: function (svgHeader, wh, _gt, ws2_plural, rectOrText_plural, _slash_svg, ws2_plural) {
		return svgHeader.unitySVG () +
		    wh.unitySVG () +
		    _gt.unitySVG () +
		    ws2_plural.unitySVG ().join ('') +
		    rectOrText_plural.unitySVG ().join ('') +
		    _slash_svg.unitySVG () +
		    ws2_plural.unitySVG ().join ('');
	    },
	    rect: function (_rect, ws1_plural, id, xywh, _gt, ws2_plural, _slash_rect, ws3_plural) {
		return _rect.unitySVG () +
		    ws1_plural.unitySVG ().join ('') +
		    id.unitySVG () + 
		    xywh.unitySVG () +
		    _gt.unitySVG () +
		    ws2_plural.unitySVG ().join ('') +
		    _slash_rect.unitySVG () +
		    ws3_plural.unitySVG ().join ('');
	    },
	    text: function (_text, ws1_plural, id, xy, _gt, ws2_plural, htmlchar_plural, _slash_text, ws3_plural) {
	    	return _text.unitySVG () +
		    ws1_plural.unitySVG ().join ('') +
		    id.unitySVG () + 
		    xy.unitySVG () +
		    _gt.unitySVG () +
		    ws2_plural.unitySVG ().join ('') +
		    htmlchar_plural.unitySVG ().join ('') +
		    _slash_text.unitySVG () +
		    ws3_plural.unitySVG ().join ('');
	    },
	    id: function (_id, str) { return _id.unitySVG () + str.unitySVG ();},
	    xywh: function (xy, wh) { return xy.unitySVG () + wh.unitySVG ()},
	    xy: function (_x, n, _y, n2) {return _x.unitySVG () + n.unitySVG () + _y.unitySVG () + n2.unitySVG (); },
	    wh: function (_width, n, _height, n2) { return _width.unitySVG () + n.unitySVG () + _height.unitySVG () + n2.unitySVG (); },
	    htmlchar: function (any) { return any.unitySVG (); },
	    numString: function (_q1, digit_plural, _q2, ws_plural) { 
		return _q1.unitySVG () + 
		    digit_plural.unitySVG ().join ('') + 
		    _q2.unitySVG() + 
		    ws_plural.unitySVG ().join (''); 
	    },
	    xstring: function (_q1, notDQuote_plural, _q2, ws_plural) { 
		return _q1.unitySVG () + 
		    notDQuote_plural.unitySVG ().join ('') + 
		    _q2.unitySVG () +
		    ws_plural.unitySVG ().join (''); 
	    },
	    notDQuote: function (any) { return any.unitySVG (); },
	    svgHeader: function (_svg, any) { return any.unitySVG (); },
	    
	    ws: function (c) { return c.unitySVG (); },

	    _terminal: function() { return this.primitiveValue; }
	}
    );};


function make_semantics_Factbase (semantics) {
    semantics.addOperation (
	'toFactbase',
	{
	    html: function (wss, htmlElement, headerStuff, bodyElement, bodyStuff, bodyElementEnd, htmlEnd) { throw "INTERNAL ERROR"; },
	    htmlElement: function (html, wss) { throw "INTERNAL ERROR"; },
	    headerStuff: function (stuff) { throw "INTERNAL ERROR"; },
	    bodyElement: function (body, wss) { throw "INTERNAL ERROR"; },
	    bodyStuff: function (stuff) { throw "INTERNAL ERROR"; },
	    notBody:function (c) { throw "INTERNAL ERROR"; },
	    notBodyEnd: function (c) { throw "INTERNAL ERROR"; },
	    bodyElementEnd: function (body, wss) { throw "INTERNAL ERROR"; },
	    htmlEnd: function (html, wss) { throw "INTERNAL ERROR"; },

	    bodyStuff: function (pres, svg, post) { throw "INTERNAL ERROR"; },

	    bodyStuffPre: function (c) { throw "INTERNAL ERROR"; },
	    bodyStuffPost: function (stuff) { throw "INTERNAL ERROR"; },
	    svgSection: function (svg, wh, _gt, wss1, elements, endSvg, wss2) { throw "INTERNAL ERROR"; },

	    // a fact, in general, is a triple { relation, subject, object }
	    // a factbase, in general, is a collection of triples
	    // we create facts by calling the JS "fact" function

	    // rect returns an array[4] of fact strings
	    rect: function (_rect, _wss1, idTree, xywhTree, _gt, _wss2, _endRect, _wss3) {
		var result = [];
		var id = idTree.toFactbase ();
		var xywh = xywhTree.toFactbase ();
		result.push (`fact ("rect_x", ${id}, ${xywh[0]});`);
		result.push (`fact ("rect_y", ${id}, ${xywh[1]});`);
		result.push (`fact ("rect_w", ${id}, ${xywh[2]});`);
		result.push (`fact ("rect_h", ${id}, ${xywh[3]});`);
		return result.join('\n'); 
	    },
	    // text returns an array[3] of fact strings
	    text: function (_text, wss1, idTree, xyTree, _gt, wss2, chars, _endText, wss3) {
		var result =[];
		var id = idTree.toFactbase ();
		var xy = xyTree.toFactbase ();
		result.push (`fact ("text_x", ${id}, ${xy[0]});`);
		result.push (`fact ("text_y", ${id}, ${xy[1]});`);
		result.push (`fact ("text_text", ${id}, "${chars.unitySVG().join('')}");`);
		return result.join('\n'); 
	    },
	    id: function (_ideq, id) { return id.toFactbase (); },
	    xywh: function (xy, wh) { return xy.toFactbase ().concat (wh.toFactbase ()); },
	    xy: function (_xeq, xnum, _yeq, ynum) {
		return [xnum.toFactbase (), ynum.toFactbase ()]; 
	    },
	    wh: function (_weq, wnum, _heq, hnum) {
		return [wnum.toFactbase (), hnum.toFactbase ()]; 
	    },
	    htmlchar: function (c) { return c.toFactbase (); },
	    numString: function (_q1, ds, _q2, _wss) { 
		return parseInt(ds.unitySVG ().join (''))},
	    xstring: function (_q1, cs, _q2, wss) { 
		return '"' + cs.toFactbase ().join ('') + '"';
	    },
	    notDQuote: function (c) { return c.toFactbase (); },

	    svgHeader: function (_svg, wss) { throw "INTERNAL ERROR"; },

	    ws: function (c) { 
		return c.toFactbase ();
	    },

	    _terminal: function () { return this.primitiveValue; }
	});
};
    
function make_semantics_AddFactbaseToHTML (semantics) {
    semantics.addOperation (
	'addFactbaseToHTML',
	// glue the Factbase (as a <script>) to the raw HTML

	// implementation note: every rule before svgSection calls .addFactbaseToHTML(),
	//   every rule after svgSection can call .unitySVG()
	//   the gluing happens in svgSection, after which it is business as usual (.unitySVG)

	{
	    html: function (wss, htmlElement, headerStuff, bodyElement, bodyStuff, bodyElementEnd, htmlEnd) {
		return wss.addFactbaseToHTML ().join ('') + htmlElement.addFactbaseToHTML () + headerStuff.addFactbaseToHTML () + bodyElement.addFactbaseToHTML () + bodyStuff.addFactbaseToHTML () + bodyElementEnd.addFactbaseToHTML () + htmlEnd.addFactbaseToHTML (); 
	    },
	    htmlElement: function (html, wss) { return "<" + "html>" + wss.addFactbaseToHTML ().join (''); },
	    headerStuff: function (stuff) { return stuff.addFactbaseToHTML ().join (''); },
	    bodyElement: function (body, wss) { return "<" + "body>" + wss.addFactbaseToHTML ().join ('')},
	    bodyStuff: function (stuff) { return stuff.addFactbaseToHTML ().join (''); },
	    notBody:function (c) { return c.unitySVG (); },
	    notBodyEnd: function (c) { return c.unitySVG (); },
	    bodyElementEnd: function (body, wss) { return "<" + "/body>" + wss.unitySVG ().join ('');},
	    htmlEnd: function (html, wss) { return "<" + "/html>" + wss.unitySVG ().join ('');},

	    bodyStuff: function (pres, svg, post) { return pres.addFactbaseToHTML ().join('') + svg.addFactbaseToHTML () + post.addFactbaseToHTML (); },

	    bodyStuffPre: function (c) { return c.addFactbaseToHTML (); },
	    bodyStuffPost: function (stuff) { return stuff.unitySVG (); },

	    // the switcheroo happens here
	    // emit the raw unity HTML, plus the factbase for the SVG (as a <script> of "fact" calls) 
	    svgSection: function (svg, wh, _gt, wss1, elements, endSvg, wss2) {
		return svg.unitySVG () + wh.unitySVG () + ">" +
		    wss1.unitySVG ().join ('') + elements.unitySVG ().join ("") + "<" + "/svg>" +
		    wss2.unitySVG ().join ('') +
		    "<" + "script>\n" +
		    elements.toFactbase ().join("\n") +
		    "\n</script>\n"
		;
	    },
	    
	    rect: function (_rect, wss1, id, xywh, gt, wss2, _endRect, wss3) { throw "INTERNAL ERROR"; },
	    text: function (_text, wss1, id, xy, _gt, wss2, cs, _endText, wss3) { throw "INTERNAL ERROR"; },

	    id: function (ideq, id) { return "\"id${id.addFactbaseToHTML ()}\""; },
	    xywh: function (xy, wh) { return xy.unitySVG () + wh.unitySVG (); },
	    xy: function (xeq, xnum, yeq, ynum) {
		return "x=" + xnum.unitySVG () + "y=" + ynum.unitySVG (); 
	    },
	    wh: function (weq, wnum, heq, hnum) {
		return "width=" + wnum.unitySVG () + "height=" + hnum.unitySVG (); 
	    },
	    htmlchar: function (c) { return c.unitySVG (); },
	    numString: function (_q1, ds, _q2, wss) {
		return '"' + ds.unitySVG ().join ('') + '"' + wss.unitySVG ().join ('');
	    },
	    xstring: function (_q1, cs, _q2, wss) { 
		return '"' + cs.unitySVG ().join ('') + '"' + wss.unitySVG ().join ('');
	    },
	    notDQuote: function (c) { return c.unitySVG (); },

	    svgHeader: function (_svg, wss) {
		return "<" + "svg" + wss.unitySVG ().join ('');
	    },

	    ws: function (c) { 
		return c.unitySVG ();
	    },

	    _terminal: function () { return this.primitiveValue; }
	});
};
