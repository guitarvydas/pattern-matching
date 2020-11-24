var p2g = new tokenParser ( true, 'comment', commentGrammar );
var p2 = new tokenParser ( true, 'comment', commentGrammar, commentSemantics );
console.log ("2 (comments):");
console.log (
    lineify (
	p2.parse (
	    p1.parse (testText)
	)
    )
);
