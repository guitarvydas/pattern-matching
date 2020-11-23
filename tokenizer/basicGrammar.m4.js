// include the following rules in all subclasses:
//     TokenArray = "[" Token ("," Token)* "]"
//     Token = BasicToken

const basicGrammar = `
  basic {
     BasicToken = "{" GVERYBASICKIND "," Text "," Line "," Column "}"
       NewlineToken = "{" GVERYBASICKIND "," newlineChar "," Line "," Column "}"
       BasicTokenChar = "{" GVERYBASICKIND "," char "," Line "," Column "}"
     GVERYBASICKIND = quote "token" quote ":" quote "basic" quote
     Line = quote "line" quote ":" integer
     Column = quote "column" quote ":" integer

     quote = "\\""
     Text = quote "text" quote ":" char
     
     integer = num+
     num = "0" .. "9"
     char = quote (escapedChar | simpleChar) quote
     escapeChar = "\\\\"
     escapedChar = escapeChar any
     simpleChar = any
     newlineChar = quote "text" quote ":" quote escapeChar "n" quote

     identifier = firstChar followChar*
     firstChar = "A".."Z" | "a".."z"
     followChar = "A".."Z" | "a".."z" | "0".."9" | "-" | "_"

   }
`;
