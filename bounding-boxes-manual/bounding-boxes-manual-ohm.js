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
    object = "functor0" ws* "(" (string | integer | dontCare) ws* ")" ws*

    bodyElementEnd = "</body>" ws*
    htmlEnd = "</html>" ws*
    ws = " " | "\\t" | "\\n"

    dontCare = "_"
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
    addProcessFB (semantics);
    addToInternal (semantics);
    console.log (semantics (result).processFB ());
} else {
    console.log ("Ohm matching failed");
}

function makeSubject (id_string) {
    return id_string;
};

function makeObject (v_string_or_return_or_integer) {
    return v_string_or_return_or_integer;
};

function addFact (relation, subject, object) {
    // put fact f into factbase
    var f = list (list (relation, subject, object));
    pushDB (f);
};

function fbToJSString () {
    // currently, db is stored as a list(...)
    var fb = db;
    var result = "";
    while (!isNil (fb)) {
	var fact = caar (fb);
	result += "fact (" + car (fact) + ", functor0 (" + cadr (fact) + "), functor0 (" + caddr (fact) + "));\n";
	fb = cdr (fb);
    };
    return result;
};


function addProcessFB (semantics) {
    semantics.addOperation (
	'processFB',
	{
            html: function (ws_plural, htmlElement, headerStuff,bodyElement,bodyStuff,factbase,bodyElementEnd,htmlEnd) {
		return ws_plural.processFB ().join ('') + 
		    htmlElement.processFB () + 
		    headerStuff.processFB () +
		    bodyElement.processFB () +
		    bodyStuff.processFB () +
		    factbase.processFB () +
		    bodyElementEnd.processFB () +
		    htmlEnd.processFB ();
	    },
	    htmlElement: function (_html,ws_plural) { return "<html>" + ws_plural.processFB ().join (''); },
	    headerStuff: function (notBody_plural) { return notBody_plural.processFB ().join (''); },
	    notBody: function (any) { return any.processFB (); },
	    bodyElement: function (_body,ws_plural) {
		return "<body>" + ws_plural.processFB ().join ('');
	    },
	    bodyStuff: function (any_plural) {
		return any_plural.processFB ().join ('');
	    },

	    factbase: function (_script,ws1_plural,fact_plural,_slashScript,ws2_plural) {
		// at this point, we stop blindly emitting the HTML and,
		// convert the factbase into an internal factbase
		// we do something with the internal factbase (in this simple example, nothing) and,
		// we, the, convert the processed internal fb into a string for output
		// 
		clearDB ();                          // empty the factbase
		fact_plural.processFB ();  // put facts into the factbase
		// <do something here> - in this example, we are just confirming that we can
		createBoundingBoxes ();
		// convert the fb into internal form, then spit it out again
		return "<script>" + fbToJSString () + "</script>"; // convert finished factbase into a string
	    },
	    fact: function (_fact,ws1_plural,_lpar,id,_comma1,ws2_plural,subject,_comma2,ws3_plural,object,_rparSemiColon,ws4_plural) {
		addFact (id.toInternal (), subject.processFB (), object.processFB ());
	    },
	    subject: function (_functor0,ws1_plural,_lpar,idstr,ws2_plural,_rpar,ws3_plural) {
		return makeSubject (idstr.toInternal ());
	    },
	    object: function (_functor0,ws1_plural,_lpar,strOrIntegerOrDontcare,ws2_plural,_rpar,ws3_plural) {
		return makeObject (strOrIntegerOrDontcare.toInternal ());
	    },

	    bodyElementEnd: function (_slashBody,ws_plural) {return "</body>" + ws_plural.processFB ().join (''); },
	    htmlEnd: function (_slashHTML,ws_plural) { return "</html>" + ws_plural.processFB ().join (''); },
	    ws: function (c) { return c.processFB (); },

	    dontCare: function (_underScore) { return "_"; },
	    string: function (_dq1, notDQuote_plural, _dq2) { return '"' + notDQuote_plural.processFB ().join ('') + '"'},
	    notDQuote: function (any) { return any.processFB (); },

	    integer: function (digit_plural) { throw "processFB"; },

	    _terminal: function() { return this.primitiveValue; }
	});
}

function addToInternal (semantics) {
    semantics.addOperation (
	'toInternal',
	{
            html: function (ws_plural, htmlElement, headerStuff,bodyElement,bodyStuff,factbase,bodyElementEnd,htmlEnd) { throw "toInternal"; },
	    htmlElement: function (_html,ws_plural) { throw "toInternal"; },
	    headerStuff: function (notBody_plural) { throw "toInternal"; },
	    notBody: function (any) { throw "toInternal"; },
	    bodyElement: function (_body,ws_plural) { throw "toInternal"; },
	    bodyStuff: function (any_plural) { throw "toInternal"; },
	    
	    factbase: function (_script,ws1_plural,fact_plural,_slashScript,ws2_plural) { throw "toInternal"; },
	    fact: function (_fact,ws1_plural,_lpar,id,_comma1,ws2_plural,subject,_comma2,ws3_plural,object,_rparSemiColon,ws4_plural) { throw "toInternal"; },
	    subject: function (_functor0,ws1_plural,_lpar,idstr,ws2_plural,_rpar,ws3_plural) { throw "toInternal"; },
	    object: function (_functor0,ws1_plural,_lpar,strOrIntegerOrDontcare,ws2_plural,_rpar,ws3_plural) { throw "toInternal"; },
	    
	    bodyElementEnd: function (_slashBody,ws_plural) { throw "toInternal"; },
	    htmlEnd: function (_slashHTML,ws_plural) { throw "toInternal"; },
	    ws: function (c) { throw "toInternal"; },
	    
	    dontCare: function (_underScore) { return true; },
	    string: function (_dq1, notDQuote_plural, _dq2) { return notDQuote_plural.toInternal ().join (''); },
	    integer: function (digit_plural) { return parseInt (digit_plural.toInternal ().join ('')); },

	    notDQuote: function (any) { return any.toInternal (); },

	    _terminal: function() { return this.primitiveValue; }
	});
}


var newFacts;
function clearNewFacts (){
    newFacts = list ();
};

function newFact (factAsList) {
    newFacts = cons (list (factAsList), newFacts);
};



function createBoundingBoxes () {
    clearNewFacts ();
    var r = execQuery ();
    appendNewFactsToFB ();
}

function appendNewFactsToFB () {
    db = AppendInefficient (db,newFacts);
}


function execQuery () {
    var _ = true;
    var g = goal (
	list ("@", "display", 10), list ("@", "newline"),
	list ("rect", lvar ("ID") , _),
	list ("@", "display", 20), list ("@", "newline"),
	list ("rect-x", lvar ("ID"), lvar ("X") ),
	list ("@", "display", 30), list ("@", "newline"),
	list ("rect-y", lvar ("ID"), lvar ("Y") ),
	list ("@", "display", 40), list ("@", "newline"),
	list ("rect-w", lvar ("ID"), lvar ("W") ),
	list ("@", "display", 50), list ("@", "newline"),
	list ("rect-h", lvar ("ID"), lvar ("H") ),
	list ("@", "display", 60), list ("@", "newline"),
	list ("@", "newFact", "bb-left", lvar ("ID"), lvar ("X")),
	list ("@", "newFact", "bb-right", lvar ("ID"), list ("@", "add", lvar ("X"), lvar ("W"))),
	list ("@", "newFact", "bb-top", lvar ("ID"), lvar ("Y")),
	list ("@", "newFact", "bb-bottom", lvar ("ID"), list ("@", "add", lvar ("Y"), lvar ("H")))
    );
    var result = query (g);
    return result;
}
