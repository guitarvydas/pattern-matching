const ohm = require ('ohm-js');
const fs = require ('fs');

const patternSCL = `
Pattern {
  Program = space* MainSection InferenceRule+ WhereSection

  MainSection = "main" InferenceNameReference+

  InferenceRule = "rule" InferenceNameDeclaration "match" Match "infer" Inference

  Match =  Triple+
  Inference = Triple+
  WhereSection = "where" ForeignDeclaration+

  InferenceNameDeclaration = identifier
  InferenceNameReference = identifier

  Triple = identifier "(" IDorLV "," Atom ")"

  ForeignDeclaration = "foreign" identifier FormalList?
  
  IDorLV = identifier | logicVariable

  Atom = String | Integer | ForeignCall | IDorLV

  identifier = ~keyword lower_case_char char*
  lower_case_char = ("-" | "_" | "a" .. "z") 
  upper_case_char = "A" .. "Z"
  char = ~space (lower_case_char | upper_case_char)
  logicVariable = upper_case_char char*

  ForeignCall = "@" identifier ArgList?

  ArgList = "(" Arg ("," Arg)+ ")"
  FormalList = "(" Formal ("," Formal)* ")"

  Arg = String | Integer | IDorLV
  Formal = identifier
  
  String = "\\"" notQuote* "\\""
  Integer = ("0" .. "9")+
  notQuote = ~"\\"" any

  space += slashSlashComment
  slashSlashComment = "//" (~"\\n" any)* "\\n"
  
  keyword = ("foreign" | "where" | "infer" | "rule") &space
}`;

const ohmParser = ohm.grammar (patternSCL);
const source = fs.readFileSync('bounding-boxes.pattern');
const result = ohmParser.match (source);

if (result.succeeded ()) {
    console.log ("Ohm matching succeeded");
} else {
    console.log ("Ohm matching failed");
    console.log (ohmParser.trace (patternSCL).toString());
}
