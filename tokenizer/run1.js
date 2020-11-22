var p1 = new tokenParser ( basicGrammar, 'tokenize', basicSemantics );

console.log ("1:");
console.log (
    lineify (p1.parse ("a\n//comment\ndef\n"))
    //lineify (p1.parse ("a\n\"def\""))
);
