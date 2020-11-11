(defparameter text1 "a")

(defun example1-esrap ()
  (esrap:defrule oneA #\a (:lambda (x) x))
  (esrap:parse 'oneA text1))

