#!/bin/bash

cat html.js globals.js support.js \
    basicGrammar.js basicSemantics.js \
    parser.js \
    tokenizer.js \
    comment.js \
    run1.js run2.js >junk.js

node junk.js
