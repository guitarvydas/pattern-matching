var p4 = new tokenParser ( true, 'ws', wsGrammar, wsSemantics );
var p4g = new tokenParser ( true, 'ws', wsGrammar );
console.log ("4 (ws):");
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

