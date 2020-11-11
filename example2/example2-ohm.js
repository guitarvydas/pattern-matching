const text = "ab";

const example2_grammar = `
Example2 {
  OneAThenOneB = OneA OneB
  OneA = "a"
  OneB = "b"
}`;

const ohm = require ('ohm-js');
const ohmParser = ohm.grammar (example2_grammar);
const result = ohmParser.match (text);

if (result.succeeded ()) {
    console.log ("Ohm matching succeeded");
} else {
    console.log ("Ohm matching failed");
}
