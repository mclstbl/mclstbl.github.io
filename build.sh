#!/bin/sh

# generate documentation HTMLs
docco public/scripts/tokenizer.js -o public/docs 
docco public/scripts/parser.js -o public/docs
docco public/scripts/codegen.js -o public/docs
docco public/scripts/webform.js -o public/docs

# install required node modules 
if [ ! -d node_modules ]; then 
npm install
npm install express
npm install body-parser
fi

# start the server to kick off React.js app
node server.js
