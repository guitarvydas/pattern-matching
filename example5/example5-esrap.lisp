(defparameter svgRectString "
<svg width=\"800\" height=\"800\">
  <rect id=\"id0\" x=\"40\" y=\"120\" width=\"150\" height=\"60\"></rect>
</svg>
")


;; cull syntactic noise and return only the meat

(defun example5-esrap ()
  (esrap:defrule SVGElement 
      (and (* ws) "<svg" (* ws) (* SVGAttribute) ">" (* ws) (+ SVGRect) "</svg>" (* ws))
    (:lambda (x)
      (list 'svg (fourth x) (seventh x))))
  (esrap:defrule SVGAttribute (or WidthAttribute HeightAttribute))
  (esrap:defrule WidthAttribute (and "width=" IntegerString)
    (:function second)
    (:lambda (n) (cons 'w n)))
  (esrap:defrule HeightAttribute (and "height=" IntegerString)
    (:destructure (h n)
		  (declare (ignore h))
		  (cons 'h n)))    
  (esrap:defrule SVGRect (and "<rect" (* ws) (+ RectContent) ">" (* ws) "</rect>" (* ws))
    (:function third)
    (:lambda (content) (cons 'rect content)))
  (esrap:defrule RectContent (or IDattr Xattr Yattr WidthAttr HeightAttr) (:lambda (x) x))
  (esrap:defrule IDattr (and "id=" (* ws) String) 
    (:function third) (:lambda (str) (cons 'id str)))
  (esrap:defrule Xattr (and "x=" (* ws) IntegerString) 
    (:function third) (:lambda (n) (cons 'x n)))
  (esrap:defrule Yattr (and "y=" (* ws) IntegerString) 
    (:function third) (:lambda (n) (cons 'y n)))
  (esrap:defrule WidthAttr (and "width=" (* ws) IntegerString) 
    (:function third) (:lambda (n) (cons 'w n)))
  (esrap:defrule HeightAttr (and "height=" (* ws) IntegerString) 
    (:function third) (:lambda (n) (cons 'h n)))
  (esrap:defrule IntegerString 
      (and "\"" (* (esrap:character-ranges (#\0 #\9))) "\"" (* ws))
    (:destructure (q1 digits q2 w)
		  (declare (ignore q1 q2 w))
		  (parse-integer (esrap:text digits))))
  (esrap:defrule String (and #\" (* NotQuote) #\" (* ws)) 
    (:function second)
    (:text t))
  (esrap:defrule ws (or #\Space #\Newline))
  (esrap:defrule NotQuote (and (esrap::! #\") esrap::character) 
    (:function second)
    (:text t))

  (esrap:parse 'SVGElement svgRectString))
