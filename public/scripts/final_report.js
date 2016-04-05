// # MICAELang
// # Multiplatform Illustrated Context-Free ASCII Emoji Language

// This file will contain all sections prior to implementation, which starts at compiler.js

// Remember to use sandwich in every section (intro,body,conclusion)(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// ## IMPLEMENTATION

// There are three main components to the MICAELang web application, which are
// separated into three scripts. This script (compiler.js) depends on parser.js
// and codegen.js which are imported via these require statements.

// ## COMPILER.JS

// The green Compile button starts up the compiler so whenever the page loads,
// an EventListener is present to detect when it is clicked. Upon detection,
// the compile function is called.
window.onload = function() 
{
  btn = document.getElementById('submitArea');
  btn.addEventListener('click', compile, false);
}

var codegen = require('./5_codegen');
var parser = require('./3_parser');
var symbol = require('./4_symbol');

// ### Browser code and Browserify 
// Since this app only runs on the browser (no server), Browserify has been
// made part of the build process in order the enable the '''require''' keyword,
// and to bundle all the scripts into one.

// ## '''compile()'''
// This function is associated with a button which starts the compilation steps when clicked.
// Each time the Compile button is clicked, the output from the previous compilation is not cleared. 
// This is necessary in order to 
// simulate the environment of a computer terminal or command prompt.

exports.compile = compile;

var compile = function() 
{
  node = document.createElement("p");
  obj = document.getElementById("input");
  code = obj.value.toString();

  if (code == '') return true;
  
// ## Invoking the Parser
// 
  parser.parse(code);

// 
  SYMBOL_TABLE = parser.SYMBOL_TABLE;
  TOKENS = parser.TOKENS;
  ERROR = parser.ERROR;
  
  codegen.generate(parser.TOKENS,parser.SYMBOL_TABLE);
  JS = codegen.JS;

// The final output of compiling and running the MICAELang code is 
// posted on the right hand side of the browser, within a div called "outputArea."  
  str = (parser.ERROR == "") ? eval(JS) : parser.ERROR;
  str += "<br>;"
  document.getElementById("outputArea").innerHTML += str;
}
},{"./3_parser":2,"./4_symbol":3,"./5_codegen":4}],2:[function(require,module,exports){
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
},{"./4_symbol":3}],3:[function(require,module,exports){
// ## SYMBOL.JS
var SYMBOL = function(t,i,v)
{
  this.type = t;
  this.identifier = i;
  this.value = v;
}

SYMBOL.prototype = {
  doX : function () {}
}

exports.SYMBOL = SYMBOL;

// ## Identifier-based Lookup
// The lookup function for SYMBOLs starts searching from the end of the '''SYMBOL_TABLE'''
// until the first element.
exports.lookup = function(identifier,SYMBOL_TABLE)
{
  return null;
}

exports.insert = function(type,identifier,value,SYMBOL_TABLE)
{
//  var length = Object.keys(SYMBOL_TABLE).length;
  var sym = new SYMBOL("int", "i", "2");
  if (lookup(identifier,SYMBOL_TABLE) == -1)
  {
    SYMBOL_TABLE[SYMBOL_TABLE.length + 1] = sym;
  }

  return SYMBOL_TABLE;
}


// ## symbol.TABLE
// This data structure keeps track of identifiers, their values, and types.
// Represented by a 2-dimensional array
exports.TABLE = function()
{
  SYMBOL_TABLE;
}
},{}],4:[function(require,module,exports){
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

},{"./3_parser":2,"./4_symbol":3}]},{},[1]);
// ## Testing
// Test plan -- how the program/system was verified. Put the actual test results in the Appendix. This section is useful if your project is more on the software engineering side than research focused.

// ## Results
// This covers different areas to the 'Testing' chapter, and is appropriate for 'research style' projects. For such projects this chapter should detail the types of experiments/simulations that were carried out with the code written. Why were certain experiments carried out but not others? What were the important parameters in the simulation and how did they affect the results? If there are very many graphs and tables associated with this chapter they may be put in the Appendix, but it is generally better to keep these close to the text they illustrate, as this is easier for the reader.

// ## Conclusion, Evaluation and Further Work
// What have you achieved? Give a critical appraisal (evaluation) of your own work - how could the work be taken further (perhaps by another student next year)?

// This file will contain report sections after Implementation// ## References

// This is a hack - copy bibtex format

// This is [an example][id] reference-style link.

// This is [an example](http://example.com/ "Title") inline link.
// [@id]: http://example.com/  "Optional Title Here"