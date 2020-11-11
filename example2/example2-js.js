// to run:
// > node example2-js.js

const text = "ab";
const re = /ab/;

function main () {
    if (re.test (text)) {
	console.log (`JavaScript pattern ${re} succeeded in matching "${text}"`);
    } else {
	console.log (`pattern failed`);
    }
}

main ();
