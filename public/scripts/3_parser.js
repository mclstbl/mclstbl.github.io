// ## PARSER.JS
// The parser module checks the input MICAELang code for syntax errors.
// This script parses the textarea input (passed on by compiler.js) and,
// upon successful checking, generates JavaScript for consumption by 
// compiler.js.

var symbol = require('./4_symbol');

function tokenize(CODE,SYMBOL_TABLE) 
{
// This function takes an array of strings as input and returns an array of tokens.
// The tokenization serves as an intermediate step of compilation 
// in order to make parsing simpler.
  TOKENS = [];
  
  var GRAMMAR = 
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

// # Scanning the code
// This step scans every word in the string contained by CODE and determines
// the appropriate token to represent it. The TOKENS array maps to the CODE array. 
// The contents of code need to be split according to occurences of newline first.
// Each line is then split into words which are easier to translate into tokens.  
  WORDS = CODE.split('\s');
  for (i = 0; i < WORDS.length; i ++) 
  {
// The GRAMMAR's regular expressions are traversed and compared to each word
// to determine which token should be used.
      g = 0;
      re = /\d/;
      l = null;
      while (WORDS[i].match(re) == null) {
        console.log(i);
        re = GRAMMAR[g][1];
        g ++;
      }
      TOKENS[i] = GRAMMAR[g][0];
// If the word contains a Number, String or Boolean literal, the value needs
// to be recorded in the symbol table.

// # Symbol Table
// This is 2-dimensional array containing the index-value pairs of the found
// symbol. Each time a new Number, String or Boolean value is tokenized, the
// symbol table grows to accomodate a new row.
     if(TOKENS[i].match(/NUMBER|STRING|BOOLEAN/) != null)
     {
       s = SYMBOL_TABLE.length + 1;
       SYMBOL_TABLE[s][0] = i;
       SYMBOL_TABLE[s][1] = l;
     }
   }

// # Returning the populated TOKENS array
// After scanning the code for tokens, the TOKENS array is returned to the
// parse function for further processing.
    return TOKENS;
}

exports.parse = function(CODE) 
{ 
// The productions that are allowed in the language is be defined by EXPRESSIONS.
  EXPRESSIONS = [];
  SYMBOL_TABLE =[[]];
  ERROR = "";
  exports.TOKENS = tokenize(CODE,SYMBOL_TABLE);
  exports.SYMBOL_TABLE = SYMBOL_TABLE;
  exports.ERROR = ERROR;
};