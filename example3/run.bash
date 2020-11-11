#!/bin/bash
node example3-js.js
sbcl --noinform --eval "(progn (ql:quickload :cl-ppcre :silent t) (load \"./example3-cl-ppcre.lisp\") (format *standard-output* \"(cl-ppcre) in flipped ~s~%\" (example3-regex)))" --quit
sbcl --noinform --eval "(progn (ql:quickload :esrap :silent t) (load \"./example3-esrap.lisp\") (format *standard-output* \"esrap flipped ~s~%\" (example3-esrap)))" --quit
