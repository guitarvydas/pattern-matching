var p1 = new tokenParser ( false, 'tokens', tokensGrammar, tokensSemantics );
console.log ("1 (tokenize):");
console.log (
    lineify (p1.parse (testText))
);
