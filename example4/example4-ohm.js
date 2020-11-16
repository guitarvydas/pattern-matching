const text = `
<svg width="800" height="800">
  <rect id="id0" x="40" y="120" width="150" height="60"></rect>
</svg>
`;


const example4_grammar = `
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
const ohmParser = ohm.grammar (example4_grammar);
const result = ohmParser.match (text);

if (result.succeeded ()) {
    console.log ("Ohm matching succeeded");
} else {
    console.log ("Ohm matching failed");
}

