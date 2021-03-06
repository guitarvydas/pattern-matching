const text = `
<svg width="800" height="800">
      <rect id="id0" x="40" y="120" width="150" height="60"></rect>
      <rect id="id1" x="40" y="320" width="150" height="60"></rect>
      <rect id="id2" x="280" y="120" width="250" height="130"></rect>
      <rect id="id3" x="650" y="120" width="150" height="60"></rect>
      <rect id="id4" x="650" y="270" width="150" height="60"></rect>
      <rect id="id5" x="650" y="360" width="150" height="60"></rect>
      <rect id="id6" x="650" y="440" width="150" height="60"></rect>
</svg>
`;


const example6_grammar = `
Example1 {
  SVGElement = "<svg" SVGAttribute* ">" SVGRect+ "</svg>"
  SVGAttribute = WidthAttribute | HeightAttribute
  SVGRect = "<rect" RectContent+ ">" "</rect>"
  RectContent = IDAttribute | XAttribute | YAttribute | WidthAttribute | HeightAttribute

  IDAttribute = "id=" string
  XAttribute = "x=" integerString
  YAttribute = "y=" integerString
  WidthAttribute = "width=" integerString
  HeightAttribute = "height=" integerString

  string = "\\"" notDQuote* "\\""
  notDQuote = ~"\\"" any
  integerString = "\\"" integerDigit+ "\\""
  integerDigit = "0" .. "9"
}`;

const ohm = require ('ohm-js');
const ohmParser = ohm.grammar (example6_grammar);
const result = ohmParser.match (text);

if (result.succeeded ()) {
    var semantics = ohmParser.createSemantics ();
    addExample6 (semantics);
    addJSON6 (semantics);
    console.log ('example6 ohm:');
    console.log (semantics (result).example6 ());
    console.log ('example6 ohm JSON:');
    console.log (semantics (result).JSON6 ());
} else {
    console.log ("Ohm matching failed");
}

function addExample6 (semantics) {
    semantics.addOperation (
	'example6',
	{
	    SVGElement: function (_svg, attrs, _gt, rects, _end) {
		return "<svg" + attrs.example6 ().join ('') + ">\n" + rects.example6 ().join ('\n') + "\n</svg>"; },
	    SVGAttribute: function (attribute) { return attribute.example6 (); },
	    SVGRect: function (_rect, contents, _gt, _end) {
		return "<rect" + contents.example6 ().join ('') + ">" + "</rect>";},
	    RectContent: function (attribute) { return attribute.example6 (); },
	    IDAttribute: function (_id, str) {return "id=" + str.example6 (); },
	    XAttribute: function (_x, n) { return "x=" + n.example6 (); },
	    YAttribute: function (_y, n) { return "y=" + n.example6 (); },
	    WidthAttribute: function (_w, n) { return "width="+ n.example6 (); },
	    HeightAttribute: function (_h, n) { return "height=" + n.example6 (); },
	    string: function (_q1, characters, _q2) { return '"' + characters.example6 ().join('') + '"'; },
	    notDQuote: function (c) { return c.example6 (); },
	    integerString: function (_q1, digits, _q2) { return '"' + digits.example6 ().join('') + '"'; },
	    integerDigit: function (d) { return d.example6 (); },
	    _terminal: function() { return this.primitiveValue; }
	}
    );
}

function addJSON6 (semantics) {
    semantics.addOperation (
	'JSON6',
	{
	    SVGElement: function (_svg, attrs, _gt, rects, _end) {
		return "svg {\n" + attrs.JSON6 ().join (',\n') + ",\ncontents: [\n  " + rects.JSON6 ().join (',\n  ') + "\n]}"; },
	    SVGAttribute: function (attribute) { return attribute.JSON6 (); },
	    SVGRect: function (_rect, contents, _gt, _end) {
		return "{ kind: 'rect', " + contents.JSON6 ().join (', ') + " }";},
	    RectContent: function (attribute) { return attribute.JSON6 (); },
	    IDAttribute: function (_id, str) {return "id: " + str.JSON6 (); },
	    XAttribute: function (_x, n) { return "x: " + n.JSON6 (); },
	    YAttribute: function (_y, n) { return "y: " + n.JSON6 (); },
	    WidthAttribute: function (_w, n) { return "w: "+ n.JSON6 (); },
	    HeightAttribute: function (_h, n) { return "h: " + n.JSON6 (); },
	    string: function (_q1, characters, _q2) { return "'" + characters.JSON6 ().join('') + "'"; },
	    notDQuote: function (c) { return c.JSON6 (); },
	    integerString: function (_q1, digits, _q2) { return digits.JSON6 ().join(''); },
	    integerDigit: function (d) { return d.JSON6 (); },
	    _terminal: function() { return this.primitiveValue; }
	}
    );
}
