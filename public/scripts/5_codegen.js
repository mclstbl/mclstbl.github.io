// ## CODEGEN.JS

var parser = require('./3_parser');
var symbol = require('./4_symbol');

var CODETREE = 
  [
// ASSIGNMENT refers to the equal sign.
  ['IS',        ' = '],
// MATH_OPERATORS contains tokens for operations which produce a numerical value.
  ['PLUS',      ' + '],
// The MINUS (-) operator can refer to either subtraction or unary minus.
// The interpretation of this symbol is determined by its usage.
  ['MINUS',     ' - '],
  ['MULT',      ' * '],
  ['DIV',       ' / '],
  ['POW',       ' ^ '],
// BOOLEAN_OPERATORS are operators which produce a Boolean value.
  ['LT',        ' < '],
  ['GT',        ' > '],
  ['EQ',        ' == '],
  ['OR',        ' || '],
  ['AND',       ' && '],
// The TYPES array holds tokens for the 3 data types supported by MICAELang: Number, String and Boolean.
  ['NUMBER',    '\/\\d\/'],
  ['STRING',    '\/".*"\/'],
  ['BOOLEAN',   '\/^true$|^false$\/'],
// The COMMENT token is returned when a comment is found.
  ['COMMENT',   '//'],
// The CLOSURES token contains constructs which are used for scoping.
  ['LBRACKET',  '('],
  ['RBRACKET',  ')'],
  ['START',     ''],
  ['EOF',       ''],
  ['EOL',       ';'],
  ['UNDEFINED', '']
  ];

exports.generate = function(TOKENS,SYMBOL_TABLE) 
{ 
   TOKENS = parser.TOKENS;
   SYMBOL_TABLE = parser.SYMBOL_TABLE;
// The productions that are allowed in the language is be defined by EXPRESSIONS.
  JS = "console.log(\"Hello world\");";
  /*
    for (i = 0; i < TOKENS.length; i ++) 
    {
      g = 0;
      while (CODETREE[g][0] != TOKENS[i]) 
      {
        g ++;
      }
      JS += CODETREE[g][1];
    }
   */
  exports.JS = JS;
};
