// ### Testing
// Test plan -- how the program/system was verified. Put the actual test results in the Appendix. This section is useful if your project is more on the software engineering side than research focused.  

// The MICAELang project was tested using whitebox unit tests. Each module builds on top of other ones so each one was verified incrementally before moving on to write the next
// module. Since there are no testing frameworks currently available for this language (MICAELang), testing was done manually by writing snippets of code and compiling
// to see the output.

// The first unit to be tested was the tokenizer.
// Symbol module
// Parser
// Codegen

// The testing details on each of the units are available in the Appendix section of this paper.

// ### Results
// This covers different areas to the 'Testing' chapter, and is appropriate for 'research style' projects. For such projects this chapter should detail the types of experiments/simulations that were carried out with the code written. Why were certain experiments carried out but not others? What were the important parameters in the simulation and how did they affect the results? If there are very many graphs and tables associated with this chapter they may be put in the Appendix, but it is generally better to keep these close to the text they illustrate, as this is easier for the reader.

// ### Conclusion, Evaluation and Further Work
// What have you achieved? Give a critical appraisal (evaluation) of your own work - how could the work be taken further (perhaps by another student next year)?

// This file will contain report sections after Implementation
//

// ### APPENDIX
// #### *Testing: Tokenizer*
//    <pre><code>
//    = + - * / < ^ > == :* <3 1314213  "hello" "hi" true     ashka
//    # # hello # #
//    [          ] :D :( ~ 121kjn
//    </code></pre>
// tabs,newlines,spaces to see if they would be ignored
// deliberate syntax error to see if it would be detected
// manually verify that each one's corresponding token is correct
      
// #### *Testing: Symbol table*
// #### *Testing: Parser*
// Minimal working MICAELang parse
// <pre><code>
// :D Hello ~
// :(
// </code></pre>
        
// #### *Testing: Code generator*

// ### References
//