var p4 = new tokenParser ( true, 'ident', identGrammar, identSemantics );
var p4g = new tokenParser ( true, 'ident', identGrammar );
console.log ("4 (ident):");
console.log (
    lineify (
	p4.parse (
	    p3.parse (
		p2.parse (
		    p1.parse (testText)
		)
	    )
	)
    )
);

