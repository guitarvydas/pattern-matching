const text = "ab";
const re = /(a)(b)/;

function main () {
    var matchArray = text.match (re);
    if (matchArray) {
	var first = matchArray[1];
	var second = matchArray[2];
	console.log (`(javascript) flipped is "${second}${first}"`);
    } else {
	console.log (`pattern failed`);
    }
}


main ();
