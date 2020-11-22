
var p2 = new tokenParser ( 'comment', commentGrammar, commentSemantics );
console.log ("2:");
console.log (
    lineify (
	p2.parse (
	    p1.parse (testText)
	)
    )
);
