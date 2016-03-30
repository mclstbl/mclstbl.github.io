function compile() {
// This function is associated with a button which starts the compilation steps when clicked.
// Each time the Compile button is clicked, the output from the previous compilation is cleared. This is necessary in order to 
// simulate the environment of a computer terminal or command prompt.
  document.getElementById("outputArea").innerHTML = "";
// A paragraph HTML is used to represent the output of a MICAELang program. A <p> node is created for each compilation and is appended to
// the document's child nodes.
  node = document.createElement("p");
// The output of compiling and running the MICAELang code is ultimately posted on the right hand side of the browser, within a div called "outputArea."
  t = document.createTextNode(document.getElementById("input").value + "\r\n");
  str = node.appendChild(t); document.getElementById("outputArea").appendChild(node);
  eval(str);
}
