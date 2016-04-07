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