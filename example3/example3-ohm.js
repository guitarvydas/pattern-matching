const text = "ab";

const example1_grammar = `
Example1 {
  OneAThenOneB = OneA OneB
  OneA = "a"
  OneB = "b"
}`;

const ohm = require ('ohm-js');
const ohmParser = ohm.grammar (example1_grammar);
const result = ohmParser.match (text);

if (result.succeeded ()) {
    var semantics = ohmParser.createSemantics ();
    semantics.addOperation (
	'flip',
	{
	    OneAThenOneB: function (a, b) { 
		return `${b.flip ()}${a.flip ()}`;
	    },
	    OneA: function (a) { return a.flip (); },
	    OneB: function (b) { return b.flip ();},
	      _terminal: function() { return this.primitiveValue; }
	}
    );
    console.log ("Ohm flipped : " + semantics (result).flip ());
} else {
    console.log ("Ohm matching failed");
}
