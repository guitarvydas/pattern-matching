(defparameter text2 "ab")

(defun example2-esrap ()
  (esrap:defrule oneA #\a (:lambda (x) x))
  (esrap:defrule oneB #\b (:lambda (x) x))
  (esrap:defrule oneAThenOneB (and oneA oneB) (:lambda (x) x))
  (esrap:parse 'oneAThenOneB text2))

