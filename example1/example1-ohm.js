const text = "a";

const example1_grammar = `
Example1 {
  OneA = "a"
}`;

const ohm = require ('ohm-js');
const ohmParser = ohm.grammar (example1_grammar);
const result = ohmParser.match (text);

if (result.succeeded ()) {
    console.log ("Ohm matching succeeded");
} else {
    console.log ("Ohm matching failed");
}
