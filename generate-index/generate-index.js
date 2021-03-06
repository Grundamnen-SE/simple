var fs = require('fs');

var replaceAll = function(target, search, replacement, flags) {
  flags = typeof flags !== "undefined" ? flags : "g"; // Den sista parametern är valfri, ger man inte den sätts den till "g"
  return target.replace(new RegExp(search, flags), replacement);
};

/* First fix the table part */

var tab1 = fs.readFileSync("./table.html", "utf8");
var tab2 = tab1;

tab2 = replaceAll(tab2, "(<td.*?>).*(</td>)", "$1$2", "gm");
tab2 = replaceAll(tab2, "tab1", "tab2");

var tablePart = tab2 + tab1;

/* Then combine index.html and the table: */

var warning = "<!-- THIS FILE IS AUTO GENERATED BY generate_index.js. DO NOT MAKE ANY CHANGES! --> \n";

var fileToWrite = warning + fs.readFileSync("./index.html", "utf8");
fileToWrite = replaceAll(fileToWrite, "%table%", tablePart, ""); // Omit global search
fs.writeFileSync("../public/index.html", fileToWrite);

console.log("Generated /public/index.html");
