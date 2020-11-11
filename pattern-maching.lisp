
(defparameter text2 "ab")

(defun regex2 ()
  (cl-ppcre::register-groups-bind (first second) 
      ("(a)(b)" text2)
    (list first second)))

(defun esrap2 ()
  (esrap:defrule oneA #\a (:lambda (x) x))
  (esrap:defrule oneB #\b (:lambda (x) x))
  (esrap:defrule oneAThenOneB (and oneA oneB) (:lambda (x) x))
  (esrap:parse 'oneAThenOneB text2))

(defun regex3 ()
  (cl-ppcre::register-groups-bind (first second) 
      ("(a)(b)" text2)
    (list second first)))

(defun esrap3 ()
  (esrap:defrule oneA #\a (:lambda (x) x))
  (esrap:defrule oneB #\b (:lambda (x) x))
  (esrap:defrule oneAThenOneB (and oneA oneB) (:destructure (x y) (list y x)))
  (esrap:parse 'oneAThenOneB text2))


(defparameter svgRectString "
<svg width=\"800\" height=\"800\">
  <rect id=\"id0\" x=\"40\" y=\"120\" width=\"150\" height=\"60\"></rect>
</svg>
")

(defun esrap4 ()

  (esrap:defrule SVGElement 
      (and (* ws) "<svg" (* ws) (* SVGAttribute) ">" (* ws) (+ SVGRect) "</svg>" (* ws))
    (:destructure (ws0 svg-element-open ws1 attributes svg-element-close ws2 rects svg-finish ws3)
		  (list ws0 svg-element-open ws1 attributes svg-element-close ws2 rects svg-finish ws3)))
  (esrap:defrule SVGAttribute (or WidthAttribute HeightAttribute))
  (esrap:defrule WidthAttribute (and "width=" IntegerString))
  (esrap:defrule HeightAttribute (and "height=" IntegerString))
  (esrap:defrule SVGRect (and "<rect" (* ws) (+ RectContent) ">" (* ws) "</rect>" (* ws))
    (:destructure (rect-element-open ws1 content rect-element-close ws2 rect-finish ws3)
		  (list rect-element-open ws1 content rect-element-close ws2 rect-finish ws3)))
  (esrap:defrule RectContent (or IDattr Xattr Yattr WidthAttr HeightAttr) (:lambda (x) x))
  (esrap:defrule IDattr (and "id=" (* ws) String) (:destructure (id ws str) (list id ws str)))
  (esrap:defrule Xattr (and "x=" (* ws) IntegerString) (:destructure (x ws str) (list x ws str)))
  (esrap:defrule Yattr (and "y=" (* ws) IntegerString) (:destructure (y ws str) (list y ws str)))
  (esrap:defrule WidthAttr (and "width=" (* ws) IntegerString) (:destructure (w ws str) (list w ws str)))
  (esrap:defrule HeightAttr (and "height=" (* ws) IntegerString) (:destructure (h ws str) (list h ws str)))
  (esrap:defrule IntegerString 
      (and "\"" (* (esrap:character-ranges (#\0 #\9))) "\"" (* ws))
    (:lambda (x) x))
  (esrap:defrule String (and #\" (* NotQuote) #\" (* ws)))
  (esrap:defrule ws (or #\Space #\Newline))
  (esrap:defrule NotQuote (and (esrap::! #\") esrap::character))
  
  
  (esrap:parse 'SVGElement svgRectString))

(defun esrap5 ()
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

(defparameter svgRectString2 "
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

(defun esrap6 ()
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

  (esrap:parse 'SVGElement svgRectString2))

