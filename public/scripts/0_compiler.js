// There are three main components in the web Graphical User Interface (GUI): the editable textarea, clickable "Compile" button, and the read-only output textbox.
// Together, they simulate an Integrated Development Environment (IDE) where users can edit, run and view their programs.

// The "Compile" button triggers the compilation when it is clicked so whenever the main HTML page loads, an EventListener is created in order to detect 
// mouseclicks.
window.onload = function() 
{
  btn = document.getElementById('submitArea');
  btn.addEventListener('click', compile, false);

  document.getElementById("outputArea").readOnly = true;
}

// ####Compilation####
var PARSER = require('./3_parser');
var TOKENIZER = require('./2_tokenizer');
var SYMBOL = require('./4_symbol');
var CODEGEN = require('./5_codegen');

// The compile function is associated with a button which starts the compilation steps when clicked.
// Each time the Compile button is clicked, the output from the previous compilation is not cleared
// in order to simulate the environment of a computer terminal.

exports.compile = compile;

var compile = function() 
{
  node = document.createElement("p");
  obj = document.getElementById("input");
  var code = obj.value.toString();
  exports.CODE = code;

  if (code == '') { console.log("no"); return true;}
  
// Invoking the parser 
// returns list of tokens, symbol table hash, error
  var PARSED_CODE = PARSER.parse(code);

  TOKENIZED_CODE = PARSED_CODE.TOKENIZED;
  SYMBOL_TABLE = PARSED_CODE.SYMBOL_TABLE;

  ERROR = PARSED_CODE.ERROR;

  for(key in SYMBOL_TABLE)
  {
    console.log(SYMBOL_TABLE[key].identifier);
  }

  if (ERROR != "")
  {
    stdout(ERROR);
  }
  else
  {
    JS = CODEGEN.generate(PARSED_CODE);
    stdout(eval(JS));
  }

}

// The final output of compiling and running the MICAELang code is 
// posted on the right hand side of the browser, within a div called "outputArea." 
function stdout(RESULT)
{
  str = RESULT; //(ERROR == "") ? eval(JS) : ERROR;
  date = new Date();
  time = date.toLocaleTimeString().concat(" $ "); 
  str += "\n".concat(time);
  document.getElementById('outputArea').innerHTML += str;
  document.getElementById('outputArea').scrollTop = document.getElementById('outputArea').scrollHeight;
}
//
