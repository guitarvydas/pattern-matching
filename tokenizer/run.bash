#!/bin/bash
cat html.js globals.js support.js parser.js tokenizer.js comment.js string.js run1.js run2.js run3.js >junk.js
node junk.js
