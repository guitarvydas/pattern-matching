#!/bin/bash
PROLOG_DIR=../../prolog
cat $PROLOG_DIR/support-pre.js $PROLOG_DIR/prolog.js $PROLOG_DIR/support-post.js > ./full-prolog.js
cat ./full-prolog.js ./support-post2.js ./match.js >temp.js
node --stack-size=102400 temp.js

