#!/bin/bash
node example1-js.js
sbcl --noinform --eval "(progn (ql:quickload :cl-ppcre :silent t) (load \"./example1-cl-ppcre.lisp\") (format *standard-output* \"cl-ppcre succeeded in matching ~s~%\" (example1-regex)))" --quit
sbcl --noinform --eval "(progn (ql:quickload :esrap :silent t) (load \"./example1-esrap.lisp\") (format *standard-output* \"esrap succeeded in matching ~s~%\" (example1-esrap)))" --quit
