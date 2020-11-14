// create bounding boxes for rectangles and text

main
  create-rect-bounding-boxes
  create-text-bounding-boxes

  rule create-rect-bounding-boxes
match (ID, X, Y, W, H)
      rect (ID, _)
      rect-x (ID, X)
      rect-y (ID, Y)
      rect-w (ID, W)
      rect-h (ID, H)
    infer
      bb (ID, _)
      bb-left (ID, X)
      bb-top (ID, Y)
      bb-right (ID, @add(X, W))
      bb-bottom (ID, @add(Y, H))

    var temp1;
    var temp2;
    var temp3;
    var temp4;
    rule (head ("create-rect-bounding-boxes"),
	  body (functor0 ("temp1", lvar ("ID"), lvar ("X"), lvar ("Y"), lvar ("W"), lvar ("H")),
		assert ("bb-left", lvar ("ID"), lvar ("X")),
		assert ("bb-top", lvar ("ID"), lvar ("Y")),
		assert ("bb-right", lvar ("ID"), lvar ("Temp3")),
		assert ("bb-bottom", lvar ("ID"), lvar ("Temp4")),

    rule (
	  body (functor2 ("rect", lvar ("ID"), true),
		functor2 ("rect-x", lvar ("ID"), lvar ("X")),
		functor2 ("rect-y", lvar ("ID"), lvar ("Y")),
		functor2 ("rect-w", lvar ("ID"), lvar ("W")),
		functor2 ("rect-h", lvar ("ID"), lvar ("H"))
	       ));
query (goal (functor2 (
		new_fact ("bb", lvar ("ID"), true),
		new_fact ("bb-left", lvar ("ID"), lvar ("X")),
		new_fact ("bb-top", lvar ("ID"), lvar ("Y")),
			  
		

  rule create-text-bounding-boxes
    match
      text (ID, _)
      text-x (ID, X)
      text-y (ID, Y)
      text-text (ID, TEXT)
      text-font (ID, FONT)
    infer
      bb (ID, _)
      bb-left (ID, X)
      bb-top (ID, Y)
      bb-right (ID, @text-add-length(TEXT, X, FONT))
      bb-bottom (ID, @text-add-height(TEXT, Y, FONT))

  where
      foreign add (x, y)
      foreign text-add-length (s, x, font)
      foreign text-add-height (s, y, font)


-->
    var goal = 
    query (
