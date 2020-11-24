var p5 = new tokenParser ( true, 'ident', identGrammar, identSemantics );
var p5g = new tokenParser ( true, 'ident', identGrammar );
console.log ("5 (ident):");
console.log (
    lineify (
	p5.parse (
	    p4.parse (
		p3.parse (
		    p2.parse (
			p1.parse (testText)
		    )
		)
	    )
	)
    )
);

