(defparameter svgRectString "
<svg width=\"800\" height=\"800\">
      <rect id=\"id0\" x=\"40\" y=\"120\" width=\"150\" height=\"60\"></rect>
      <rect id=\"id1\" x=\"40\" y=\"320\" width=\"150\" height=\"60\"></rect>
      <rect id=\"id2\" x=\"280\" y=\"120\" width=\"250\" height=\"130\"></rect>
      <rect id=\"id3\" x=\"650\" y=\"120\" width=\"150\" height=\"60\"></rect>
      <rect id=\"id4\" x=\"650\" y=\"270\" width=\"150\" height=\"60\"></rect>
      <rect id=\"id5\" x=\"650\" y=\"360\" width=\"150\" height=\"60\"></rect>
      <rect id=\"id6\" x=\"650\" y=\"440\" width=\"150\" height=\"60\"></rect>
</svg>
")

(defun example6-esrap ()
  (esrap:defrule SVGElement 
      (and (* ws) "<svg" (* ws) (* SVGAttribute) ">" (* ws) (+ SVGRect) "</svg>" (* ws))
    (:lambda (x)
      (format nil "svg: {~%~{~a~^,~% ~},~% contents :[~%~{~a~^,~%~}~%]~%}~%"
	      (fourth x) (seventh x))))
  (esrap:defrule SVGAttribute (or WidthAttribute HeightAttribute))
  (esrap:defrule WidthAttribute (and "width=" IntegerString)
    (:function second)
    (:lambda (n) (format nil "w: ~a" n)))
  (esrap:defrule HeightAttribute (and "height=" IntegerString)
    (:destructure (h n)
		  (declare (ignore h))
		  (format nil "h: ~a" n)))
  (esrap:defrule SVGRect (and "<rect" (* ws) (+ RectContent) ">" (* ws) "</rect>" (* ws))
    (:function third)
    (:lambda (content) (format nil "{ kind: 'rect', ~{~a~^, ~} }"
			       content)))
  (esrap:defrule RectContent (or IDattr Xattr Yattr WidthAttr HeightAttr) (:lambda (x) x))
  (esrap:defrule IDattr (and "id=" (* ws) String) 
    (:function third) (:lambda (str) (format nil "id: '~a'" str)))
  (esrap:defrule Xattr (and "x=" (* ws) IntegerString) 
    (:function third) (:lambda (str) (format nil "x: ~a" str)))
  (esrap:defrule Yattr (and "y=" (* ws) IntegerString) 
    (:function third) (:lambda (str) (format nil "y: ~a" str)))
  (esrap:defrule WidthAttr (and "width=" (* ws) IntegerString) 
    (:function third) (:lambda (str) (format nil "w: ~a" str)))
  (esrap:defrule HeightAttr (and "height=" (* ws) IntegerString) 
    (:function third) (:lambda (str) (format nil "h: ~a" str)))
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
