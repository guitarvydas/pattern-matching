#!/bin/bash
set -v

cat m4.m4 basicGrammar.inc basicSemantics.inc comment.m4.js >temp.m4
m4 temp.m4 >comment.js
cat m4.m4 basicGrammar.inc basicSemantics.inc strings.m4.js >temp.m4
m4 temp.m4 >strings.js
cat m4.m4 basicGrammar.inc basicSemantics.inc ident.m4.js >temp.m4
m4 temp.m4 >ident.js

cat >junk.js \
    html.js globals.js support.js \
    basic.js \
    parser.js \
    tokenizer.js \
    comment.js \
    strings.js \
    ident.js \
    testtext.js \
    run1.js \
    run2.js \
    run3.js \
    run4.js

node junk.js
