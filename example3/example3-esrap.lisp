(defparameter text "ab")

(defun example3-esrap ()
  (esrap:defrule oneA #\a (:lambda (x) x))
  (esrap:defrule oneB #\b (:lambda (x) x))
  (esrap:defrule oneAThenOneBAndFlip (and oneA oneB) (:destructure (a b) (list b a)))
  (esrap:parse 'oneAThenOneBAndFlip text))
  

