#!/bin/sh

# install required node modules 
if [ ! -d node_modules ]; then 
  npm install
fi

i="public/scripts/"

# browserify -r jison -r underscore -o $i"jison.js"
browserify $i*"compiler.js" -o $i"micaelang.js"

# remove existing final_report.js to avoid overwrite
if [ -f $i"final_report.js" ]; then
  rm $i"final_report.js"
fi

# insert project report components into one file to prepare for docco
cat $i"00_report1.js" >> $i"final_report.js"
cat $i"micaelang.js" >> $i"final_report.js"
cat $i"9_report2.js" >> $i"final_report.js"
cat $i"bib.js" >> $i"final_report.js" 

# generate documentation HTMLs using the -d flag
if [[ $1 == "-d" ]]; then
  for i in `ls public/scripts/final_report.js`; do
    cmd="docco -o public/docs $i"
    # change layout of documentation to linear for printing purposes
    if [[ $2 == "-r" ]]; then
      cmd=$cmd" -l linear -c public/css/plain.css"
    # to use custom CSS, uncomment the next line
    #  cmd=$cmd" -c public/css/custom.css"
    # otherwise use classic layout for web rendering
    fi
    eval $cmd
  done
fi
