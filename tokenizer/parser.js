function tokenParser (inheritBasic, name, grammars, semanticsFunctions) {
    this.name = name;
    this.semanticsFunctions = semanticsFunctions;

    this.parse = function (text) {
	this.grammarsNamespace = ohm.grammars (grammars);
	this.parser = this.grammarsNamespace[this.name];
	this.result = this.parser.match (text);
	
	if (this.result.succeeded ()) {
	    basicLineNumber = 1;
	    basicColumnNumber = 1;
	    if (undefined != this.semanticsFunctions) {
		var semantics = this.parser.createSemantics ();
		semantics.addOperation (this.name, this.semanticsFunctions);
		if (inheritBasic) {
		    semantics.addOperation ('basic', basicSemantics);
		};
		this.sem = (semantics (this.result))[name] ();
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

