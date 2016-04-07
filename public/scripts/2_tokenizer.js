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