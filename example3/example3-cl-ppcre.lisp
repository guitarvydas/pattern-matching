(defparameter text "ab")

(defun example3-regex ()
  (cl-ppcre::register-groups-bind (first second) 
      ("(a)(b)" text)
    (list second first)))

