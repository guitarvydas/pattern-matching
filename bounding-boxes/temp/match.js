
function make_fb1 () {
fact ("rect", functor0 ("id0"), functor0 (_));
fact ("rect-x", functor0 ("id0"), functor0 (40));
fact ("rect-y", functor0 ("id0"), functor0 (120));
fact ("rect-w", functor0 ("id0"), functor0 (150));
fact ("rect-h", functor0 ("id0"), functor0 (60));
fact ("rect", functor0 ("id1"), functor0 (_));
fact ("rect-x", functor0 ("id1"), functor0 (40));
fact ("rect-y", functor0 ("id1"), functor0 (320));
fact ("rect-w", functor0 ("id1"), functor0 (150));
fact ("rect-h", functor0 ("id1"), functor0 (60));
fact ("rect", functor0 ("id2"), functor0 (_));
fact ("rect-x", functor0 ("id2"), functor0 (280));
fact ("rect-y", functor0 ("id2"), functor0 (120));
fact ("rect-w", functor0 ("id2"), functor0 (250));
fact ("rect-h", functor0 ("id2"), functor0 (130));
fact ("rect", functor0 ("id3"), functor0 (_));
fact ("rect-x", functor0 ("id3"), functor0 (650));
fact ("rect-y", functor0 ("id3"), functor0 (120));
fact ("rect-w", functor0 ("id3"), functor0 (150));
fact ("rect-h", functor0 ("id3"), functor0 (60));
fact ("rect", functor0 ("id4"), functor0 (_));
fact ("rect-x", functor0 ("id4"), functor0 (650));
fact ("rect-y", functor0 ("id4"), functor0 (270));
fact ("rect-w", functor0 ("id4"), functor0 (150));
fact ("rect-h", functor0 ("id4"), functor0 (60));
fact ("rect", functor0 ("id5"), functor0 (_));
fact ("rect-x", functor0 ("id5"), functor0 (650));
fact ("rect-y", functor0 ("id5"), functor0 (360));
fact ("rect-w", functor0 ("id5"), functor0 (150));
fact ("rect-h", functor0 ("id5"), functor0 (60));
fact ("rect", functor0 ("id6"), functor0 (_));
fact ("rect-x", functor0 ("id6"), functor0 (650));
fact ("rect-y", functor0 ("id6"), functor0 (440));
fact ("rect-w", functor0 ("id6"), functor0 (150));
fact ("rect-h", functor0 ("id6"), functor0 (60));
};

function make_fb2 (){
fact ("text", functor0 ("id7"), functor0 (_));
fact ("text-x", functor0 ("id7"), functor0 (50));
fact ("text-y", functor0 ("id7"), functor0 (150));
fact ("text-font", functor0 ("id7"), functor0 (12));
fact ("text-text", functor0 ("id7"), functor0 ("FileSelector"));
};

var newFacts = list ();
function newFact (factAsList) {
    newFacts = cons (factAsList, newFacts);
};

function execQuery () {
    clearDB();
    var _ = true;
    make_fb1();
    var g = goal (
	functor2 ("rect", lvar ("ID") , _),
	functor2 ("rect-x", lvar ("ID"), lvar ("X") ),
	functor2 ("rect-y", lvar ("ID"), lvar ("Y") ),
	functor2 ("rect-w", lvar ("ID"), lvar ("W") ),
	functor2 ("rect-h", lvar ("ID"), lvar ("H") ),
	functor2 ("@", "newFact", "bb-left", lvar ("X")),
	functor2 ("@", "addInRegister", lvar ("X"), lvar ("W")), 
	functor2 ("@", "newFactFromRegister", "bb-right"),
	functor2 ("@", "newFact", "bb-top", lvar ("Y")),
	functor2 ("@", "addInRegister", lvar ("Y"), lvar ("H")), 
	functor2 ("@", "newFactFromRegister", "bb-bottom"),
    );
    var result = query (g);
    return result;
}

var q = execQuery ();
console.log ("... new facts ...");
console.log (newFacts.toString ());

