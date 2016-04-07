(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// #### STAGE 1: USER I/O ####
// There are three components in the web Graphical User Interface (GUI): the editable textarea, clickable "Compile" button, and the read-only output textarea.
// Together, they emulate an Integrated Development Environment (IDE) where users can edit, run and view their programs.

// The button triggers the compilation when it is clicked so whenever the main HTML page loads, an EventListener is created in order to detect mouseclicks.
// Also, ```textarea``` elements have read/write access by default so I turn on read-only mode for the output box whenever the page is loaded.
window.onload = function() 
{
  btn = document.getElementById('submitArea');
  btn.addEventListener('click', compile, false);

  document.getElementById("outputArea").readOnly = true;
}

// This function processes the target code generated using the MICAELang input, and is called after compilation is finished. 
// The results of a compilation are posted on the right hand side of the browser (in the read-only textarea) as user output.
var PROGNAME = "";

function stdout(RESULT)
{
  str = RESULT;
  date = new Date();
  time = date.toLocaleTimeString().concat(" $ "); 
  document.getElementById('outputArea').innerHTML += " " + PROGNAME + "\n" + "\n" + time;
  document.getElementById('outputArea').scrollTop = document.getElementById('outputArea').scrollHeight;
}

// The compilation sequence begins here. The parser, symbol and codegen modules are required from here. While not explicitly imported, the tokenize module
// is crucial to compilation but is called from the parse module.
var PARSER = require('./3_parser');
var SYM = require('./4_symbol');
var CODEGEN = require('./5_codegen');

exports.compile = function() 
{
  obj = document.getElementById("input");
  var CODE = obj.value.toString().trim();
  if (CODE == '') { console.log("no"); return true;}
  
// The ```ALL``` variable contains information about this system's state after each stage of compilation. It is a record containing the tokens, string inputs, symbol table
// and error pertaining to the source code. It is passed from module to module so that the state is available at any time. If an error is thrown at any stage, the compilation
// is aborted and an error is presented to the user.
  ALL = PARSER.parse(CODE); 

// DELETE
  for(var key in ALL.ST)
  {
    str = "id: " + ALL.ST[key].identifier + " type: " + ALL.ST[key].type + " value: " + ALL.ST[key].value;
    console.log(str);
  }

  TMP = {"T":ALL.ST,"E":ALL.E};
  l = SYM.lookup('PROGNAME',TMP);
  PROGNAME = l == undefined ? "" : l;
// DELETE 


  if (ALL.E != "")
  {
    stdout(ALL.E);
  }

// The code generator only returns 2 entities in a record: a JavaScript code to be evaluated using built-in JS function ```eval``` and the error string.
  else
  {
    OUTPUT = CODEGEN.generate(ALL);
    str = OUTPUT.E == "" ? OUTPUT.JS : OUTPUT.E;
    stdout(eval(str));
  }
}

// As mentioned in the _Analysis_, Browserify adds some lines to the output code before each module so here is another one.

},{"./3_parser":4,"./4_symbol":5,"./5_codegen":6}],2:[function(require,module,exports){
// #### The MICAELang Grammar
// Before moving on to the other modules, here is the MICAELang grammar explained. Not all of the productions defined here are compiled correctly as of now, but they are all
// syntactically parse-able.

// ```LEX``` is a hash table that defines the tokens and regular expression patterns for the grammar's keywords.
// There are only 3 data types accepted and they are inferred by the parser: Number, String and Boolean. Everything else that is not an operand or keyword is interpreted
// as an identifier.
var LEX = [];
LEX['START'] = 			/\:D/;
LEX['EOF'] = 				/\:\(/;
LEX['PROGRAM'] = 		/^[A-Z]+([A-Za-z]*\d*)*/;
LEX['ELSEIF'] = 		/\:\?\?/;
LEX['IF'] = 				/\:\?/;
LEX['ELSE'] = 			/\?/;
LEX['LBRACKET'] = 	/\\_/;
LEX['RBRACKET'] =		/_\//;
LEX['PRINT'] = 			/!{3}/;
LEX['AND'] = 				/<3/;
LEX['OR'] = 				/\:\*/;
LEX['FI'] = 				/\*/;
LEX['EQ'] = 				/={2}/;
LEX['IS'] = 				/={1}/;
LEX['PLUS'] = 			/\+/;
LEX['MINUS'] = 			/-/;
LEX['MULT'] = 			/\*/;
LEX['DIV'] = 				/\//;
LEX['POW'] = 				/\^/;
LEX['LT'] = 				/</;
LEX['GT'] = 				/>/;
LEX['NUMBER'] = 		/^\d*$/;
LEX['STRING'] = 		/^".*"$/;
LEX['BOOLEAN'] = 		/true|false/;
LEX['COMMENT'] = 		/\#/;
LEX['EOL'] = 				/\~/;
LEX['IDENTIFIER'] =	/^[a-z]*([0-9]*[A-Za-z]*)*/;
LEX['UNDEFINED'] = 	/.*/;

exports.getLEX = function()
{
  return LEX;
}

// The ```RULES``` hash table contains key-value pairs containing the token and a list of acceptable right-hand side tokens.
// The grammar is left-recursive which means that the operators or functions are on the left-hand side and the operands are on the right. The parser supports
// unlimited operands, but they have to be of the same type.
var RULES = [];
RULES['NUMBER']=    ['NUMBER','EOL'];
RULES['BOOLEAN']=   ['BOOLEAN','EOL'];
RULES['STRING']=    ['STRING','EOL'];
RULES['IDENTIFIER']=['IS','NUMBER','STRING','BOOLEAN','EOL'];
RULES['PROGRAM']=   ['EOL'];
RULES['PLUS']=      ['NUMBER','IDENTIFIER'];
RULES['MINUS']=     ['NUMBER','IDENTIFIER'];
RULES['MULT']=      ['NUMBER','IDENTIFIER'];
RULES['DIV']=       ['NUMBER','IDENTIFIER'];
RULES['POW']=       ['NUMBER','IDENTIFIER'];
RULES['LT']=        ['NUMBER','IDENTIFIER'];
RULES['GT']=        ['NUMBER','IDENTIFIER'];
RULES['IS']=        ['NUMBER','STRING','BOOLEAN','IDENTIFIER','POW','MULT','DIV','PLUS','MINUS','LT','GT','AND','OR','EQ'];
RULES['EQ']=        ['NUMBER','STRING','BOOLEAN','IDENTIFIER'];
RULES['AND']=       ['BOOL','IDENTIFIER'];
RULES['OR']=        ['BOOL','IDENTIFIER']; 
RULES['PRINT']=     ['STRING','NUMBER','IDENTIFIER'];
RULES['EOL']=       ['ELSEIF','IF','ELSE','FI','IDENTIFIER','PRINT','COMMENT','EOF'];
RULES['START']=     ['PROGRAM'];
RULES['EOF']=       [];

// There are three syntax subdivisions which are also accessable as part of the rules: math operators, bool operators and expressions.
RULES['OPERATORS'] =    ['POW','MULT','DIV','PLUS','MINUS'];
RULES['BOOL_OPS'] =     ['LT','GT','AND','OR','EQ'];
RULES['EXPRESSIONS'] =  ['NUMBER','STRING','BOOLEAN','IDENTIFIER'];

// The following rules for comments, parentheses, and conditionals are not implemented in the parsing yet. 
// Although their syntax can be verified when used as input, the semantics are not interpretable by the parser as of now.
RULES['COMMENT']=   ['ELSEIF','IF','ELSE','FI','STRING','COMMENT','EOL'];
RULES['LBRACKET']=  ['NUMBER','STRING','BOOLEAN','IDENTIFIER','COMMENT'];
RULES['RBRACKET']=  ['NUMBER','STRING','BOOLEAN','IDENTIFIER','COMMENT','EOL'];
RULES['IF']=        ['BOOLEAN','IDENTIFIER','LT','GT','EQ','AND','OR','LBRACKET'];
RULES['ELSEIF']=    ['BOOLEAN','IDENTIFIER','LT','GT','EQ','AND','OR','LBRACKET'];
RULES['ELSE']=      ['POW','MULT','DIV','PLUS','MINUS','IF','PRINT','COMMENT','FI'];
RULES['FI']=        ['EOL','COMMENT'];

exports.getRULES = function() {
  return RULES;
}


},{}],3:[function(require,module,exports){
// #### STAGE 2: TOKENIZATION ####
// Tokenization serves as an intermediate step of compilation in order to make parsing simpler. In this process, the raw input code is split into an array. The array contents
// are assigned tokens according to the grammar rules and this will make it easier for the parser to check patterns later.

var GRAMMAR = require('./1_grammar');
var SYM = require('./4_symbol');

// The ```tokenize``` function takes an array of strings as input and returns the state of the system.
// This function scans every word in the ```CODE``` string and determines the appropriate token to represent it. The meaning behind the program is not meant to be
// interpreted at this point. Instead, individual words (strings) are checked to see if they are a member of the grammar.

// Since this is the first compilation stage after I/O, the symbol table, tokenized code and error are initialized here.
exports.tokenize = function(CODE)
{
  var TOKENS = GRAMMAR.getLEX();
  var TOKENIZED_CODE = [];
  var SYMBOL_TABLE = {"T" : [], "E" : ""};
  var error = "";

// When ```tokenize``` is invoked, CODE contains a string so it needs to be split by whitespace to form ```WORDS```, which is an array.
  CODE = CODE.replace(/(\r\n|\n|\r|\t)/gm," ");
  var WORDS = CODE.split(/ +/);

// The regular expressions which are in the hash table ```TOKENS``` are tested against each element of ```WORD``` to determine which token fits best.
  for (i = 0; i < WORDS.length; i ++) 
  {
    for (var key in TOKENS)
    {
      var re = new RegExp(TOKENS[key]);
      if (re.exec(WORDS[i]) != null)
      {

// JavaScript crashes if the word is not found in the hash table at all so the token ```UNDEFINED``` is assigned to those which do not fit anywhere else and an error is thrown.
        if (key == 'UNDEFINED')
        {
          error = "ERROR: '" + WORDS[i] + "' is unrecognized ";
          return {"TOKENIZED" : TOKENIZED_CODE, "SYMBOLS" : SYMBOL_TABLE, "ERROR" : error};
        }
        
// If the word is an identifier or is the keyword ```START```, it needs to be recorded in the symbol table.
        if (key == 'IDENTIFIER' || key == 'PROGRAM')
        {
           sym = (key == 'PROGRAM') ? new SYM.SYMBOL('PROGRAM','PROGNAME',WORDS[i]) : new SYM.SYMBOL(undefined,WORDS[i],undefined);
           SYMBOL_TABLE = SYM.insert(sym,SYMBOL_TABLE);
           error = SYMBOL_TABLE.E;
        }
        TOKENIZED_CODE[i] = key;
        break;
      }
    }
  }

// After scanning the code for tokens, the ```TOKENIZED_CODE```, ```WORDS``` and ```SYMBOL_TABLE``` arrays, and the ```ERROR``` string are returned to the
// parse function for further processing.
  return {"T" : TOKENIZED_CODE, "W" : WORDS, "ST" : SYMBOL_TABLE.T, "E" : error};
}
},{"./1_grammar":2,"./4_symbol":5}],4:[function(require,module,exports){
// #### STAGE 3: PARSING ####
// After tokenizing, the parser performs a few checks in order to verify that the source code is syntactically correct and is ready for code generation.
// Since the grammar is left-recursive, the more commonly used recursive descent parsing method is not used here. Moreover, due to JavaScript stack call limits,
// the initially planned one-pass parsing is not implemented here. Instead, there are 3 main functions executed within the main ```parse``` sequence
// * ```checkSyntax```
// * ```simplifyExpressions```
// * ```simplifyBools```

var TOKENIZER = require('./2_tokenizer');
var GRAMMAR = require('./1_grammar');
var SYM = require('./4_symbol');

exports.parse = function(CODE) 
{ 
  ALL = TOKENIZER.tokenize(CODE);

// If an error is detected at any parsing stage, compilation is aborted. The ```ALL.E``` value contains the error string and is empty if there are no errors.

// The ```checkSyntax``` checks if the source code tokens satisfy MICAELang's grammar rules.
// Aside from the error string, the ```checkSyntax``` call also checks if the MICAELang starting header is included. Otherwise, an error is returned.
  ALL = ALL.T[0] == 'START' && ALL.T.length >= 2 && ALL.E == "" ? checkSyntax(1,ALL) 
      : {"T" : ALL.T, "W" : ALL.W, "ST" : ALL.ST, "E" : "ERROR: Program entry point not found"};

// Mathematical expressions are simplified here as much as possible and their values are stored in the symbol table.
// Similar to the previous check, ```simplifyExpressions``` only runs if there is no error. Otherwise, it does nothing, which causes the error to propagate 
// to the main compilation sequence and abort the process.
  ALL = ALL.E == "" ? simplifyExpressions(ALL) : ALL;

// The tokens, source code, symbol table and error are returned back to the compiler module. But really, the most important effect of this module is arguably
// the populated symbol table.
  return ALL;
}

// The ```checkSyntax``` function recursively checks the next token to see if the production ```<CURRENT,NEXT>``` are accepted by the grammar.
// It returns the state of the system upon completion. ```ALL.E``` would contain an error string if an illegal token is found.
var checkSyntax = function(n,ALL)
{
  if (n == ALL.T.length || ALL.E != "")
  {
    return ALL;
  }
  else
  {
    var G = GRAMMAR.getRULES();
    var NEXT = ALL.T[n];
    var CUR = ALL.T[n - 1];

    if(G[CUR].indexOf(NEXT) != -1)
    {
      return checkSyntax(n + 1,ALL);
    }
    else
    {
      ALL.E = "ERROR: '" + NEXT + "' is not accepted by the grammar";
    }
  }
  return ALL;
}

// Mention typeCheck and apply
// Populates and maintains the symbol table
var simplifyExpressions = function(ALL)
{
  G = GRAMMAR.getRULES();
  o = 0; n = 0;
  cur = ALL.T[n];

  while(cur != 'EOF' && ALL.E == "")
  {
    OPERANDS = [];
    if(G['OPERATORS'].indexOf(cur) != -1 && ALL.T[n - 2] == 'IDENTIFIER' && ALL.T[n - 1] == 'IS')
    {
      ID = ALL.W[n-2];
      OP = ALL.W[n];
      o = n + 1;
      while (cur != 'EOL')
      {
        n ++;
        cur = ALL.T[n];
      }
      OPERANDS = ALL.W.slice(o,n);
      if (!typeCheck(ALL.T.slice(o,n)))
      {
        ALL.E = "ERROR: Incompatible types"
        break;
      }
      type = ALL.T[6];
      sym = new SYM.SYMBOL(type,ID,apply(OP,OPERANDS));
      TMP = SYM.insert(sym,ALL.ST);
      ALL.ST = TMP.T;
      ALL.E = TMP.E;
      console.log("done");
    }
    n ++;
    cur = ALL.T[n]; 
  }
  return ALL;
}

var apply = function(OP,OPERANDS)
{
  n = 0;
  str = "";
  ctr = 0;
  l = OPERANDS.length;
  while (n < l)
  {
    str = str.concat(OP,OPERANDS[n]);
  }
  
  return eval(str);
}

// This function returns true if two expressions are of compatible types and false if they are not.
var typeCheck = function(OPERANDS)
{
  l = OPERANDS.length;
  if (l > 0)
  {
    o = OPERANDS[0];
    for(i = 0; i < l; i ++)
    {
      if(OPERANDS[i] != o)
      {
        return false
      }
    }
  }
  return true;
}

//
},{"./1_grammar":2,"./2_tokenizer":3,"./4_symbol":5}],5:[function(require,module,exports){
// #### The Symbol Table ####
// The ```symbol.js``` module defines a structure for containing the identifier, type, and value of variables (```IDENTIFIER```) in MICAELang. The actual table
// is a hash of key-value pairs of identifiers and their associated ```SYMBOL``` objects.

// This module defines three methods
// * ```lookup```
// * ```update```
// * ```insert```

// During the tokenization and parsing of a program, this module maintains a symbols table containing 0 or more instances of ```SYMBOL```. The three methods
// are designed such that duplicate symbols are not allowed in the language, and type mismatches cause a compilation error.

// The SYMBOL object has three fields: type, identifier and value.
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

// The ```lookup``` function returns the current value of the identifier in the symbol table if it exists, and returns ```undefined``` otherwise.
var lookup = function(ID,ALL)
{
  if (ALL.T = [])
  {
    return undefined;
  }
  else if (ALL.T[ID] != undefined)
  {
    return ALL.T[ID].value;    
  }
  return undefined;
}

exports.lookup = lookup;

// The ```update``` function attempts to modify the value of an existing symbol table entry.
// It returns the new status of the symbol table, and the ```ERROR``` string, which is empty unless there is a type mismatch.
var update = function(SYM,ALL)
{
  if (ALL.T[SYM.identifier].type == SYM.type)
  {
    ALL.T[SYM.identifier].value = SYM.value;
    console.log ("Updated sym table");
  }
  else
  {
    ALL.E = "ERROR: Type mismatch in inserting '" + SYM.identifier + "' into symbol table"
  }
  return ALL;
}

exports.update = update;

// The ```insert``` function adds a new entry to the symbol table if it does not exist yet; otherwise, it tries to update the symbol associated with the identifier.
// It returns an array containing the new status of the symbol table and the ```ERROR``` string. Note that if the identifier exists in the symbol table, the error
// depends on the return value of the ```update``` function.
var insert = function(SYM,ALL)
{
  if (lookup(SYM.identifier,ALL.T) == undefined)
  {
    ALL.T[SYM.identifier] = SYM;
    console.log("Inserted into symbol table");
  }
  else
  {
    console.log("New sym table entry");
    ALL = update(SYM,TABLE);
  }
  return ALL;
}

exports.insert = insert;

// The following function returns the type of an identifier if it exists in the table, and returns undefined if lookup fails to find the entry.
exports.getType = function(ID,ALL)
{
  if (lookup(ID,ALL) != undefined)
  {
    return ALL.T[ID].type;    
  }
  return undefined;
}
//
// ###  Code Generation
//
},{}],6:[function(require,module,exports){
// #### STAGE 4: CODE GENERATION ####

var SYM = require('./4_symbol');
var TOKENIZER = require('./2_tokenizer');

exports.generate = function(ALL) 
{ 
// The productions that are allowed in the language is be defined by EXPRESSIONS.

// return {"TOKENIZED" : TOKENIZED_CODE, "SYMBOLS" : SYMBOL_TABLE, "ERROR" : error};

  WORDS = ALL.W;

  JS = "\"hello\"";
  return {"JS":JS, "E":""};
}
//
},{"./2_tokenizer":3,"./4_symbol":5}]},{},[1]);
