var translate = require('./index');


// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

var targetLang = 'en';
if (process.argv.length > 3) {
    targetLang = process.argv[3];
}


// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
  
 /*
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  console.log(data)
});
*/


var options = { encoding: 'utf8' };
var wstream = fs.createWriteStream('output.txt', options);
// OR add the encoding to each write


var readline = require('readline');
readline.createInterface({
    input: fs.createReadStream(filename),
    terminal: true
}).on('line', function(line) {
   translate(line, {to: targetLang}).then(res => {
       wstream.write("\n\n========================================================================");
       wstream.write('\nIN:  ' + line);
       wstream.write("\nOUT: " + res.text);
       
        console.log("\n========================================================================");
        console.log('IN:  ' + line);
        //console.log(res.from.language.iso);
        console.log("OUT: " + res.text);
        //=> nl
}).catch(err => {
    console.error(err);
});
});

//wstream.end();
