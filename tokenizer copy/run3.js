var p3 = new tokenParser ( true, 'strings', stringsGrammar, stringsSemantics );
var p3g = new tokenParser ( true, 'strings', stringsGrammar );
console.log ("3:");
console.log (
    lineify (
	p3.parse (
	    p2.parse (
		p1.parse (testText)
	    )
	)
    )
);

