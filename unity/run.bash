#!/bin/bash
# REGEX can't easily handle this match, so omit re and cl-ppcre
node unity-ohm.js
#sbcl --noinform --eval "(progn (ql:quickload :esrap :silent t) (load \"./example6-esrap.lisp\") (format *standard-output* \"esrap result is ~s~%\" (example6-esrap)))" --quit
# skip Ohm-js in a browser until example6

