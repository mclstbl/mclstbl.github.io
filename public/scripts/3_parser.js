// 3.  Parsing
// The parser module checks the input MICAELang code for syntax errors.
// This script parses the textarea input (passed on by compiler.js) and,
// upon successful checking, generates JavaScript for consumption by 
// compiler.js.

var SYM = require('./4_symbol');
var TOKENIZER = require('./2_tokenizer');
var COMPILER = require('./0_compiler');

exports.parse = function(CODE) 
{ 
// The productions that are allowed in the language is defined by EXPRESSIONS.

// return {"TOKENIZED" : TOKENIZED_CODE, "SYMBOLS" : SYMBOL_TABLE, "ERROR" : error};
  CODE = TOKENIZER.tokenize(CODE);
  
  if (CODE.ERROR != "")
  {
    return CODE;
  }
// TODO: find meaning here then calculate error, etc

// The first syntax error found is also appended to the '''TOKENIZED_CODE''' array is returned to the calling function '''compile'''.

  PARSED_CODE = CODE;
  return CODE;
}
//