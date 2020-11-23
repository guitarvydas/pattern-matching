//
// non-general grammar and semantics for mapping characters into tokens...
//

const tokensGrammar =
    `tokens {
	tokens = basicToken+
	basicToken = newline | character
	newline = "\\n"
	character = any
    }`;

const tokensSemantics = {
    tokens: function (token_plural) { 
	return JSON.stringify (token_plural.tokens ());
    },
    basicToken: function (b) { return b.tokens (); },
    newline: function (nl) {
	var result = makeToken ("basic", "\n", basicLineNumber, basicColumnNumber);
	basicLineNumber += 1;
	basicColumnNumber = 1;
	return result;
    },
    character: function (c) {
	var result = makeToken ("basic", c.tokens (), basicLineNumber, basicColumnNumber);
	basicColumnNumber += 1;
	return result;
    },
    _terminal: function() { return this.primitiveValue; }
};


