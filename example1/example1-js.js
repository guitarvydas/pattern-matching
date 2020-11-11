// to run:
// > node example1-js.js

const text = "a";
const re = /a/;

function main () {
    if (re.test (text)) {
	console.log (`JavaScript pattern ${re} succeeded in matching "${text}"`);
    } else {
	console.log (`pattern failed`);
    }
}

main ();
