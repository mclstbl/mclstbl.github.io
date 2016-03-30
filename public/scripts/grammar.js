// This script defines the grammar of MICAELang. Jison is used to process the input grammar and produce a parser. 

// Since this app runs only on the client (browser) side, Browserify was used in order to make the Jison library available without a server.
var Parser = require("jison").Parser;

var grammar = {
  "lex": {
      "rules": [
         ["\\s+", "/* skip whitespace */"],
         ["[a-f0-9]+", "return 'HEX';"]
      ]
  },

  "bnf": {
      "hex_strings" :[ "hex_strings HEX",
                       "HEX" ]
  }
};

var parser = new Parser(grammar);

var parserSource = parser.generate();

if(parser.parse("adfe34bc e82a")) {
  l = document.createTextNode("Hello");
  outputArea.appendChild(l);
}