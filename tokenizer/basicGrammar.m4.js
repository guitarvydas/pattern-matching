// include the following rules in all subclasses:
//     TokenArray = "[" Token ("," Token)* "]"
//     Token = BasicToken

const basicGrammar = `
  basic {
     // basic grammar
     BasicToken = "{" GVERYBASICKIND "," Text "," Line "," Column "}"
       NewlineToken = "{" GVERYBASICKIND "," newlineText "," Line "," Column "}"
     AnyKind = quote "token" quote ":" quote identifier quote
     Line = quote "line" quote ":" integer
     Column = quote "column" quote ":" integer

     quote = "\\""
     Text = quote "text" quote ":" quote char+ quote
     
     integer = num+
     num = "0" .. "9"
     char = escapedChar | simpleChar
     escape = "\\\\"
     escapedChar = escape any
     simpleChar = anyNotQuoteNorEscape
     anyNotQuoteNorEscape = ~quote ~escape any
     newlineText = quote "text" quote ":" quote escape "n" quote

     identifier = firstChar followChar*
     firstChar = "A".."Z" | "a".."z"
     followChar = "A".."Z" | "a".."z" | "0".."9" | "-" | "_"
   }
`;