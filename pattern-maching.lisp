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
      (and ws* "<svg" ws* SVGAttribute* ">" ws* SVGRect+ "</svg>" ws*)
    (:destructure (ws0 svg-element-open ws1 attributes svg-element-close ws2 rects svg-finish ws3)
		  (list ws0 svg-element-open ws1 attributes svg-element-close ws2 rects svg-finish ws3)))
  (esrap:defrule SVGAttribute (or WidthAttribute HeightAttribute))
  (esrap:defrule WidthAttribute (and "width=" Int ws*))
  (esrap:defrule HeightAttribute (and "width=" Int ws*))
  (esrap:defrule SVGRect (and "<rect" ws* RectContent+ ">" ws* "</rect>" ws*)
    (:destructure (rect-element-open ws1 content rect-element-close ws2 rect-finish ws3)
		  (list rect-element-open ws1 content rect-element-close ws2 rect-finish ws3)))
  (esrap:defrule RectContent (or IDattr Xattr Yattr WidthAttr HeightAttr) (:lambda (x) x))
  (esrap:defrule IDattr (and "id=" ws IntegerString) (:destructure (id ws str) (list id ws str)))
  (esrap:defrule Xattr (and "x=" ws IntegerString) (:destructure (x ws str) (list x ws str)))
  (esrap:defrule Yattr (and "y=" ws IntegerString) (:destructure (y ws str) (list y ws str)))
  (esrap:defrule WidthAttr (and "width=" ws IntegerString) (:destructure (w ws str) (list w ws str)))
  (esrap:defrule HeightAttr (and "height=" ws IntegerString) (:destructure (h ws str) (list h ws str)))
  (esrap:defrule IntegerString 
      (* (character-ranges (#\0 #\9)))
    (:lambda (x) x))
  (esrap:defrule ws #\Space)
  
  
  (esrap:parse 'SVGElement svgRectString))

