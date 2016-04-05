// ## GRAMMAR.JS
exports.GRAMMAR = 
  [
// ASSIGNMENT refers to the equal sign.
  ['IS','\/=\/'],
// MATH_OPERATORS contains tokens for operations which produce a numerical value.
  ['PLUS','\/+\/'],
// The MINUS (-) operator can refer to either subtraction or unary minus.
// The interpretation of this symbol is determined by its usage.
  ['MINUS','\/-\/'],
  ['MULT','\/*\/'],
  ['DIV','\/\/\/'],
  ['POW','\/^\/'],
// BOOLEAN_OPERATORS are operators which produce a Boolean value.
  ['LT','\/<\/'],
  ['GT','\/>\/'],
  ['EQ','\/==\/'],
  ['OR','\/:*\/'],
  ['AND','\/<3\/'],
// The TYPES array holds tokens for the 3 data types supported by MICAELang: Number, String and Boolean.
  ['NUMBER','\/\\d\/'],
  ['STRING','\/".*"\/'],
  ['BOOLEAN','\/^true$|^false$\/'],
// The COMMENT token is returned when a comment is found.
  ['COMMENT','\/#\/'],
// The CLOSURES token contains constructs which are used for scoping.
  ['LBRACKET','\/[\/'],
  ['RBRACKET','\/]\/'],
  ['START','\/:D\/'],
  ['EOF','\/:(\/'],
  ['EOL','\/~\/'],
  ['UNDEFINED','\/.\/']
  ];

exports.TOKENS = 

 //follow json format key/value pairs: 
var grammar = {
   // JavaScript comments also work

   "lex": {
      "rules": [
         ["\\s+",                    "/* skip whitespace */"],
         ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER'"],
         ["\\*",                     "return '*'"],
         ["\\/",                     "return '/'"],
         ["-",                       "return '-'"],
         ["\\+",                     "return '+'"],
         ["\\^",                     "return '^'"],
         ["!",                       "return '!'"],
         ["%",                       "return '%'"],
         ["\\(",                     "return '('"],
         ["\\)",                     "return ')'"],
         ["PI\\b",                   "return 'PI'"],
         ["E\\b",                    "return 'E'"],
         ["$",                       "return 'EOF'"]
      ]
   },

   "operators": [
      ["left", "+", "-"],
      ["left", "*", "/"],
      ["left", "^"],
      ["right", "!"],
      ["right", "%"],
      ["left", "UMINUS"]
   ],

   "bnf": {
      "expressions": [["e EOF",   "return $1"]],

      "e" :[
         ["e + e",  "$$ = $1+$3"],
         ["e - e",  "$$ = $1-$3"],
         ["e * e",  "$$ = $1*$3"],
         ["e / e",  "$$ = $1/$3"],
         ["e ^ e",  "$$ = Math.pow($1, $3)"],
         ["e !",    "$$ = (function(n) {if(n==0) return 1; return arguments.callee(n-1) * n})($1)"],
         ["e %",    "$$ = $1/100"],
         ["- e",    "$$ = -$2", {"prec": "UMINUS"}],
         ["( e )",  "$$ = $2"],
         ["NUMBER", "$$ = Number(yytext)"],
         ["E",      "$$ = Math.E"],
         ["PI",     "$$ = Math.PI"]
      ]
   }
}