#!/bin/sh

# generate documentation HTMLs using the -d flag
if [[ $1 == "-d" ]]; then
  for i in `ls public/scripts/*js`; do
    cmd="docco $i -o public/docs"
    # change layout of documentation to linear for printing purposes
    if [[ $2 == "-r" ]]; then
      cmd=$cmd" -l linear"
    # otherwise use classic layout for web rendering
    else
      cmd=$cmd" -l classic"
    fi
    eval $cmd
  done
fi

# install required node modules 
if [ ! -d node_modules ]; then 
npm install
fi

i="public/scripts/"

browserify -r jison -o $i"parser.js"

# for demo/testing purposes, start the server to kick off React.js app
node server.js
