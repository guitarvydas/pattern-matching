define(<!BASICGRAMMAR!>,<!
     basicToken = "{" GVERYBASICKIND "," text "," line "," column "}"
       NewlineToken = "{" GVERYBASICKIND "," newlinetext "," line "," column "}"
     BasicKind = quote "token" quote ":" quote "basic" quote
     AnyKind = quote "token" quote ":" quote identifier quote
     line = quote "line" quote ":" integer
     column = quote "column" quote ":" integer

     quote = "\\""
     text = quote "text" quote ":" quote char+ quote
     
     integer = num+
     num = "0" .. "9"
     char = escapedChar | simpleChar
     simpleChar = ~quote ~escape any
     escapedChar = ~quote escape any
     escape = "\\\\"
     newlinetext = quote "text" quote ":" quote escape "n" quote

     identifier = firstChar followChar*
     firstChar = "A".."Z" | "a".."z"
     followChar = "A".."Z" | "a".."z" | "0".."9" | "-" | "_"
!>)
