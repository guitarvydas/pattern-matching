(defparameter text1 "a")

(defun regex1 ()
  (cl-ppcre::register-groups-bind (first) 
      ("(a)" text1)
    first))

(defun esrap1 ()
  (esrap:defrule oneA #\a (:lambda (x) x))
  (esrap:parse 'oneA text1))


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
    (:destructure (ws0 svg-element-open ws1 attributes svg-element-close ws2 rects svg-finish ws3)
		  (declare (ignore ws0 svg-element-open ws1 svg-element-close ws2 svg-finish ws3))
		  (list 'svg attributes rects)))
  (esrap:defrule SVGAttribute (or WidthAttribute HeightAttribute))
  (esrap:defrule WidthAttribute (and "width=" IntegerString)
    (:destructure (w n)
		  (declare (ignore w))
		  (cons 'w n)))    
  (esrap:defrule HeightAttribute (and "height=" IntegerString)
    (:destructure (h n)
		  (declare (ignore h))
		  (cons 'h n)))    
    
  (esrap:defrule SVGRect (and "<rect" (* ws) (+ RectContent) ">" (* ws) "</rect>" (* ws))
    (:destructure (rect-element-open ws1 content rect-element-close ws2 rect-finish ws3)
		  (declare (ignore rect-element-open ws1 rect-element-close ws2 rect-finish ws3))
		  (cons 'rect content)))
  (esrap:defrule RectContent (or IDattr Xattr Yattr WidthAttr HeightAttr) (:lambda (x) x))
  (esrap:defrule IDattr (and "id=" (* ws) String) 
    (:destructure (id ws str) (declare (ignore id ws)) (cons 'id str)))
  (esrap:defrule Xattr (and "x=" (* ws) IntegerString) 
    (:destructure (x ws n) 
		  (declare (ignore x ws))
		  (cons 'x n)))
  (esrap:defrule Yattr (and "y=" (* ws) IntegerString) 
    (:destructure (y ws n) 
		  (declare (ignore y ws))
		  (cons 'y n)))
  (esrap:defrule WidthAttr (and "width=" (* ws) IntegerString) 
    (:destructure (w ws n) 
		  (declare (ignore w ws)) (cons 'w n)))
  (esrap:defrule HeightAttr (and "height=" (* ws) IntegerString) 
    (:destructure (h ws n) (declare (ignore h ws)) (cons 'h n)))
  (esrap:defrule IntegerString 
      (and "\"" (* (esrap:character-ranges (#\0 #\9))) "\"" (* ws))
    (:destructure (q1 digits q2 w)
		  (declare (ignore q1 q2 w))
		  (parse-integer (esrap:text digits))))
  (esrap:defrule String (and #\" (* NotQuote) #\" (* ws)) 
    (:destructure (q1 cs q2 w)
		  (declare (ignore q1 q2 w))
		  (esrap:text cs)))
  (esrap:defrule ws (or #\Space #\Newline))
  (esrap:defrule NotQuote (and (esrap::! #\") esrap::character) 
    (:destructure (nq c)
		  (declare (ignore nq))
		  c))
  
  
  (esrap:parse 'SVGElement svgRectString))

