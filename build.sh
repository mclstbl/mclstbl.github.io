#!/bin/sh

# generate documentation HTMLs using the -d flag
if [[ $1 == "-d" ]]; then
  for i in `ls public/scripts/*js`; do
    docco $i -o public/docs 
  done
fi

# install required node modules 
if [ ! -d node_modules ]; then 
npm install
npm install express
npm install body-parser
fi

# start the server to kick off React.js app
node server.js
