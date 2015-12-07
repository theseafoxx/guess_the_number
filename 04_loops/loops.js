/*
  for loop
 */

function repeat(text, count) {
    var textString;
    for(var ii=0; ii<count; ii++) {
        textString += text.toString();
    }
    return textString;
}