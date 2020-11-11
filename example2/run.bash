#!/bin/bash
node example2-js.js
sbcl --noinform --eval "(progn (ql:quickload :cl-ppcre :silent t) (load \"./example2-cl-ppcre.lisp\") (format *standard-output* \"cl-ppcre succeeded in matching ~s~%\" (example2-regex)))" --quit
sbcl --noinform --eval "(progn (ql:quickload :esrap :silent t) (load \"./example2-esrap.lisp\") (format *standard-output* \"esrap succeeded in matching ~s~%\" (example2-esrap)))" --quit
