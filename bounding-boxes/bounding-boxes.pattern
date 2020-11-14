// create bounding boxes for rectangles and text

main
  create-rect-bounding-boxes
  create-text-bounding-boxes


  rule create-rect-bounding-boxes
    match
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
