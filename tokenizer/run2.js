
var p2 = new tokenParser ( commentGrammar, 'comment', commentSemantics );
console.log ("2:");
console.log (
    lineify (
	p2.parse (
	    p1.parse (testText)
	)
    )
);
