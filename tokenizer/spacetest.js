var ohm = require ('ohm-js');

// var grammar0 = ohm.grammar (`
// gammar {
//     exp = " " "4"
// }
// `);

// var matchResult0 = grammar0.match(' 4');

// console.log (matchResult0.toString ());


// var grammar1 = ohm.grammar (`
// gammar {
//     exp = " " 
// }
// `);

// var matchResult1 = grammar1.match(' ');

// console.log (matchResult1.toString ());


// ////////////////////

// const token1 = `{"token":"basic","text":"a","line":1,"column":3}`;


// var grammar2 = ohm.grammar (`
// gammar {
//     token = "{" 
//        quote "token" quote ":" quote "basic" quote ","
//        quote "text" quote ":" quote "a" quote "," 
//        quote "line" quote ":" num ","
//        quote "column" quote ":" num
//      "}"
//     num = "0".."9"
//     quote = "\\""
// }
// `);

// var matchResult2 = grammar2.match(token1);

// console.log (matchResult2.toString ());


// const token = `"a"`;

// var grammar3 = ohm.grammar (`
// gammar {
//     token = quote "a" quote
//     quote = "\\""
// }
// `);

// var matchResult3 = grammar3.match(token);

// console.log (matchResult3.toString ());


// const token = `"   aaa   "`;

// var grammar3 = ohm.grammar (`
// gammar {
//     token = quote char+ quote
//     quote = "\\""
//     char = " " | (~quote any) | escapedChar
//     escapedChar = (~quote slash any)
//     slash = "/"
// }
// `);

// var matchResult3 = grammar3.match(token);

// console.log (matchResult3.toString ());

const token = `"   aaa   "`;

var grammar3 = ohm.grammar (`
grammar {
    token = quote char+ quote
    quote = "\\""
    char = escapedChar | simpleChar
    simpleChar = ~quote ~escape any
    escapedChar = ~quote escape any
    escape = "\\\\"
}
`);

var matchResult3 = grammar3.match(token);

console.log (matchResult3.toString ());
