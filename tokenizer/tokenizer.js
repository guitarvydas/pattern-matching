const basicGrammar =
    `tokens {
	tokens = basicToken+
	basicToken = newline | character
	newline = "\\n"
	character = any
    }`;

const basicSemantics = {
    tokens: function (token_plural) { 
	return JSON.stringify (token_plural.tokenize ());
    },
    basicToken: function (b) { return b.tokenize (); },
    newline: function (nl) {
	var result = makeToken ("basic", "\n", basicLineNumber, basicColumnNumber);
	basicLineNumber += 1;
	basicColumnNumber = 1;
	return result;
    },
    character: function (c) {
	var result = makeToken ("basic", c.tokenize (), basicLineNumber, basicColumnNumber);
	basicColumnNumber += 1;
	return result;
    },
    _terminal: function() { return this.primitiveValue; }
};


