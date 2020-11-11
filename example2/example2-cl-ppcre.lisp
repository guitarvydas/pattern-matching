;; to run
;; sbcl --script '(load "example2-cl-ppcre.lisp") (example2-regex)' --quit

(defparameter text "ab")

(defun example2-regex ()
  (cl-ppcre::register-groups-bind (first second) 
      ("(a)(b)" text)
    (list first second)))
