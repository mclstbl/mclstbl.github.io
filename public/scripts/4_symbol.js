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