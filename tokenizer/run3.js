
var p3 = new tokenParser ( stringGrammar, 'string', stringSemantics );
console.log ("3:");
console.log (
    lineify (
	p3.parse (
	    p2.parse (
		p1.parse ("a\n//comment\ndef\n")
		//p1.parse ("a\n\"def\"")
	    )
	)
    )
);

