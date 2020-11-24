var p6 = new tokenParser ( true, 'integer', integerGrammar, integerSemantics );
var p6g = new tokenParser ( true, 'integer', integerGrammar );
console.log ("6 (integer):");
console.log (
    lineify (
	p6.parse (
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
    )
);

