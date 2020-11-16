#!/bin/bash
# REGEX can't easily handle this match, so omit re and cl-ppcre
# see ../example4/ for Ohm
sbcl --noinform --eval "(progn (ql:quickload :esrap :silent t) (load \"./example5-esrap.lisp\") (format *standard-output* \"esrap result is ~s~%\" (example5-esrap)))" --quit


