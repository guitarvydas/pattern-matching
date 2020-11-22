
var p2 = new tokenParser ( commentGrammar, 'comment', commentSemantics );
console.log ("2:");
console.log (
    lineify (
	p2.parse (
	    p1.parse ("a\n//comment\ndef\n")
	    //p1.parse ("a\n\"def\"")
	    //p1.parse ("a")
	)
    )
);
