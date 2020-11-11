;; to run
;; sbcl --script '(load "example1-cl-ppcre.lisp") (example1-regex)' --quit

(defparameter text "a")

(defun example1-regex ()
  (cl-ppcre::register-groups-bind (first) 
      ("(a)" text)
    first))
