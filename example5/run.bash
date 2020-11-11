#!/bin/bash
# REGEX can't easily handle this match, so omit re and cl-ppcre
# skip Ohm-js until example6
sbcl --noinform --eval "(progn (ql:quickload :esrap :silent t) (load \"./example5-esrap.lisp\") (format *standard-output* \"esrap result is ~s~%\" (example5-esrap)))" --quit
# skip Ohm-js in a browser until example6

