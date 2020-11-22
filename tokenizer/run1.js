var p1 = new tokenParser ( 'tokens', basicGrammar, basicSemantics );
const testText = "a\n//comment\ndef// yet another comment\n// final comment";
console.log ("1:");
console.log (
    lineify (p1.parse (testText))
);
