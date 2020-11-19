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
} else {
    console.log ("Ohm matching failed");
}

