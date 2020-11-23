    Strings: function (slashSlashToken, _comma, anyTokenExceptNewline_plural) {
	var first = slashSlashToken.strings ();
	var text = joinText (anyTokenExceptNewline_plural.strings ());
	return { 
	    "token" : "strings", 
	    "text" : text, 
	    "line" : first.line, 
	    "column" : first.column
	}
    },
    SlashSlashToken: function (firstSlash, _comma, _slash) {
	return firstSlash.strings ();
    },
    FirstSlashToken: function (_lbrace, basicKind, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.strings (),
	    'text' : "/",
	    'line' : line.strings (),
	    'column' : column.strings ()
	}
    },
    SlashToken: function (_lbrace, basicKind, _comma1, _slash, _comma2, line, _comma3, column, _rbrace) { 
	return {
	    'token' : basicKind.strings (),
	    'text' : "/",
	    'line' : line.strings (),
	    'column' : column.strings ()
	}
    },
    AnyTokenExceptNewline: function (basicToken) { return basicToken.strings (); },
    slashChar: function (_q1, _text, _q2, _colon, _q3, _slash, _q4) { return "/"; }
