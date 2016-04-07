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

