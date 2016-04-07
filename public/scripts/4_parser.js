// #### STAGE 3: PARSING ####
// After tokenizing, the parser performs a few checks in order to verify that the source code is syntactically correct and is ready for code generation.
// Since the grammar is left-recursive, the more commonly used recursive descent parsing method is not used here. Moreover, due to JavaScript stack call limits,
// the initially planned one-pass parsing is not implemented here. Instead, there are 3 main functions executed within the main ```parse``` sequence
// * ```checkSyntax```
// * ```simplifyExpressions```
// * ```simplifyBools```

var GRAMMAR = require('./1_grammar');
var SYM = require('./2_symbol');
var TOKENIZER = require('./3_tokenizer');

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