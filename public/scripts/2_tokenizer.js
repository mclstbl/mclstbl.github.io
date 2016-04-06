// 2.  Tokenizing

var GRAMMAR = require('./1_grammar');
var COMPILER = require('./0_compiler');
var SYM = require('./4_symbol');

// A hash table '''TOKENS''' is generated dynamically for each tokenization required by compilation.
function makeTokenList(LEX)
{
  TOKENS = [];
  for (entry = 0; entry < LEX.length; entry ++)
  {
    key = LEX[entry][0];
    value = LEX[entry][1]
    TOKENS[key] = value;
  }
 
  return TOKENS;
}

// The '''tokenize''' function takes an array of strings as input and returns an array of tokens.
// The tokenization serves as an intermediate step of compilation 
// in order to make parsing simpler.

exports.tokenize = function(CODE)
{
  var LEX = GRAMMAR.LEX;
  var TOKENS = makeTokenList(LEX);
  var TOKENIZED_CODE = [];
  var SYMBOL_TABLE = [];
  var error = "";

// This step scans every word in the string in '''CODE''' and determines
// the appropriate token to represent it. The meaning behind the program is not meant to be
// interpreted at this point. Instead, individual words (strings) are checked to see if
// they are a possible production of the grammar.

// When '''tokenize''' is initially invoked, CODE contains a string so it needs to be split by whitespace to form '''WORDS'''.
  CODE = CODE.trim().replace(/(\r\n|\n|\r|\t)/gm," ").replace(/  /gm," ");
  WORDS = CODE.split(/ +/);

// The regular expressions which are in '''TOKENS''' tested against each word to determine which token fits best.
  for (i = 0; i < WORDS.length; i ++) 
  {
    for (var key in TOKENS)
    {
      var re = new RegExp(TOKENS[key]);
      var t = re.exec(WORDS[i]);
      if (t != null)
      {
        console.log(t);
        console.log(key);
        if (key == 'UNDEFINED')
        {
          error = "ERROR: '" + WORDS[i] + "' is unrecognized ";
          return {"TOKENIZED" : TOKENIZED_CODE, "SYMBOLS" : SYMBOL_TABLE, "ERROR" : error};
        }
        if (key == 'IDENTIFIER')
        {
        // If the word is an identifier it needs to be recorded in the symbol table.

           sym = new SYM.SYMBOL(null,WORDS[i],null);
           SYMBOL_TABLE = SYM.insert(sym,SYMBOL_TABLE);
        }
        TOKENIZED_CODE[i] = key;
        break;
      }
    }
  }

// After scanning the code for tokens, the TOKENIZED_CODE and SYMBOL_TABLE arrays are returned to the
// parse function for further processing.
  return {"TOKENIZED" : TOKENIZED_CODE, "SYMBOLS" : SYMBOL_TABLE, "ERROR" : error};
}
//