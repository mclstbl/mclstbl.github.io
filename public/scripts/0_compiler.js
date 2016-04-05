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