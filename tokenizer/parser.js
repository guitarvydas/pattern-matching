function tokenParser (grammar, semanticsName, semanticsFunctions) {
    this.semanticsName = semanticsName;
    this.semanticsFunctions = semanticsFunctions;

    this.parse = function (text) {
	this.parser = ohm.grammar (grammar);
	this.result = this.parser.match (text);
	
	if (this.result.succeeded ()) {
	    basicLineNumber = 1;
	    basicColumnNumber = 1;
	    if (undefined != this.semanticsFunctions) {
		var semantics = this.parser.createSemantics ();
		semantics.addOperation (this.semanticsName, this.semanticsFunctions);
		this.sem = (semantics (this.result))[semanticsName] ();
		return this.sem;
	    } else {
		return this.result.toString ();
	    }
	} else {
	    console.log ("parse failed");
	    return "parse failed";
	}
    }
}

