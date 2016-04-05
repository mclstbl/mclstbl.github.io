// # Multiplatform Illustrated Context-Free ASCII Emoji Language (MICAELang) #
// ## _A source-to-source compiler for an emoji-based programming language_ ##
// ### By Micaela Estabillo ###
//
// ## PROBLEM ##
// It has been observed that a subset of the population view computer programming as a 
// complicated task and are intimidated by common production-oriented languages such as C 
// and Java. The purpose of this tool is to formulate a language (and its compiler) which 
// exposes Computer Science principles without the complexity exhibited by modern 
// programming tools.
//
// ## HISTORY AND BACKGROUND ##
// The MICAELang project's purpose is to use esoteric and visual programming 
// concepts in order to provide a minimalistic environment in which computer programming 
// principles can be learned by beginners.
//
// A similar idea is implemented in Alice (What Is Alice?), a 3D programming environment which is developed
// at Carnegie Mellon University (). The creators of Alice target young students and women who
// have not had much exposure to computing. Using tiles to create animation and interactive
// games, Alice aims to be students' first exposure to the world of Computer Science.
//
// The main differences between MICAELang and Alice are:
// * Web-based - web-based platform would not require users to install
// and will make the language more accessible
// * Emojis - emojis will be used to represent programming language 
// statements instead of tiles
//
//
// ## TECHNICAL APPROACH
// The final product will be a web-based tool capable of accepting MICAELang user programs as input
// and compiling them into the target language JavaScript. Literate programming using Docco will be
// employed in order to document code.
//
// MICAELang will be divided into 3 components: GUI, Compiler, Documentation. The user will
// be interacting with the GUI, which passes MICAELang code into the compiler and outputs
// the evaluated actions to the GUI. Documentation will be written constantly and generated 
// as required.
//
// The web has been chosen as the platform for the MICAELang compiler since most people with
// computer access have them. Moreover, it allows the compiler to run without the user
// having to install other development environments or programs, regardless of operating
// system.
// 
// The compiler will be written in JavaScript, which is a dynamic, untyped and interpreted 
// programming language commonly used
// to control the behaviour of web browsers (JavaScript For Cats). 
// It is MICAELang's target language of choice since it easily integrates with HTML and
// has a platform called meteor.js, which will be used in order to build the webpages.
// Meteor.js has many installable open-source packages for easily adding graphical user
// interface elements to the website. The compiler includes the parser, which will be 
// generated using antlr4 since it has a JavaScript target (antlr4) available on Github.
//
// Documentation will be done by way of literate programming using the open-source tool
// Docco to generate human-readable text (Docco). Since the final product will be web-based,
// Docco is ideal since, by default, it generates an HTML page for JavaScript files, which
// may be displayed and also be printed into PDF files.
//
//
// ## TESTING AND EVALUATION
// The tool will be tested by having users create simple programs such as
// * Hello World
// * Fizz-Buzz
// * Math computations
//
// A survey may also be conducted at the end of testing in order to gauge the tool's effectiveness
// with respect to teaching programming principles.
//
//
// ## MILESTONES
// The following table summarizes the stages which need to be completed in order to make MICAELang.
//
// <table border="1">
// <tr>
// <td><h3>ACTIVITY</h3></td> <td><h3>DURATION</h3></td>
// </tr>
// <tr>
// <td>Submit a project proposal</td> <td>2 days</td>
// </tr>
// </tr>
// <tr>
// <td>Outline the MICAELang grammar </td> <td>1 day</td>
// </tr>
// <tr>
// <td>Produce a minimal website on which the JavaScript compiler can be run</td> <td>2 days</td>
// </tr>
// <tr>
// <td>Generate or write a parser to produce AST from user programs</td> <td>2 days</td>
// </tr>
// <tr>
// <td>Create mechanism for semantic validation of syntax</td> <td>2 days</td>
// </tr>
// <tr>
// <td>Write code generator to transform MICAELang AST to JavaScript (target language)</td> <td>3 days</td>
// </tr>
// <tr>
// <td>Add an emoji keyboard to the website</td> <td>2 days</td>
// </tr>
// </tr>
// <tr>
// <td>Submit final project report </td> <td>2 days</td>
// </tr>
// </table>
//
// ## REFERENCES
// "Docco". Web. 4 Mar. 2016.
//
// "JavaScript." antlr/antlr4. Web. 4 Mar.2016.
//
// "JavaScript For Cats." Web. 4 Mar. 2016.
//
// "What is Alice?." Alice. Carnegie Mellon University. Web. 4 Mar. 2016.