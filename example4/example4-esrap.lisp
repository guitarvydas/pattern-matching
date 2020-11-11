(defparameter svgRectString "
<svg width=\"800\" height=\"800\">
  <rect id=\"id0\" x=\"40\" y=\"120\" width=\"150\" height=\"60\"></rect>
</svg>
")


(defun example4-esrap ()

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
