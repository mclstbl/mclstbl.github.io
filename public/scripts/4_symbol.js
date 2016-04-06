// The '''symbol.js''' module defines a data structure for holding the identifier, type, and value of a variable name in MICAELang. It has three methods
// * '''lookup''''''
// * '''update'''
// * '''insert'''
// 
// During the tokenization and parsing of a program, this module maintains a symbols table containing 0 or more instances of '''SYMBOL'''. The three methods
// are designed such that duplicate symbols are not allowed in the language, and type mismatches cause a compilation error.
// The symbol table is represented as a hash table for which the key is the identifier and the value is the '''SYMBOL''' object. This facilitates quick updates,
// insertions and lookups.

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

// The '''lookup''' function returns the current value of the identifier in the symbol table if it exists, and returns '''null''' otherwise.
exports.lookup = lookup;

var lookup = function(SYM,TABLE)
{
  if (TABLE[SYM.identifier] != null)
  {
    return TABLE[SYM.value];    
  }
  return null;
}

// The '''update''' function attempts to modify the value of an existing symbol table entry.
// It returns an array containing the new status of the symbol table, and the '''ERROR''' string, which is empty unless there is a type mismatch.
var update = function(SYM,TABLE)
{
  if (TABLE[SYM.identifier].type == SYM.type)
  {
    TABLE[SYM.identifier].value = SYM.value;
  }
  else
  {
    ERROR = "ERROR: Type mismatch in inserting '" + SYM.identifier + "' into symbol table"
  }

  return [TABLE,ERROR];
}

exports.update = update;

// The '''insert''' function adds a new entry to the symbol table if it does not exist yet; otherwise, it tries to update the symbol associated with the identifier.
// It returns an array containing the new status of the symbol table and the '''ERROR''' string. Note that if the identifier exists in the symbol table, the error
// depends on the return value of the '''update''' function.
var insert = function(SYM,TABLE)
{
  if (lookup(SYM,TABLE) == null)
  {
    TABLE[SYM.identifier] = SYM;
    TABLE_AND_ERROR = [TABLE,""];
  }
  else
  {
    TABLE_AND_ERROR = update(SYM,TABLE);
  }

  return TABLE_AND_ERROR;
}

exports.insert = insert;
//