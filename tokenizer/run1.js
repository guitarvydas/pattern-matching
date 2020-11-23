var p1 = new tokenParser ( false, 'tokens', tokensGrammar, tokensSemantics );
const testText = "a\n//comment\ndef// yet another comment\n// final comment";
//const testText = "a";
console.log ("1:");
console.log (
    lineify (p1.parse (testText))
);
