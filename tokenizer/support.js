function joinText (tokenArray) {
    var stringArray = tokenArray.map (token => token.text);
    return stringArray.join ('');
}

function lineify (str) {
    // insert newlines for readability
    var s = str.replace (/},{/g, "},\n{");
    return s;
};

function makeToken (kind, str, line, column) {
    var s = str.replace (/ /g, "_"); // spaces seem to go missing in text - not investigated
    var token = { 'token' : kind, 'text' : s, 'line' : line, 'column' : column };
    return token;
};

