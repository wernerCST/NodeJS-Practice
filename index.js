/**
 * this will show the differance between blocking code and using async as an alternative
*/
const fs = require('fs');

// Blocking..
// Reead a file.
const textIn = fs.readFileSync('./text/input.txt', 'utf-8');
console.log(textIn);

// Write to a file.
const textOut = 'This is text being written on to the file on: ' + Date.now();
fs.writeFileSync('./text/output.txt', textOut);
console.log('File has beenn written');

// Non-blocking, assyncchronous way of reading a file.
fs.readFile('./text/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('ERROR!! :\\')
    // The text inside the first file is the name of the file being read here.
    fs.readFile(`./text/${data1}.txt`, `utf-8`, (err, data2) => {        
        console.log(data2);
        fs.readFile(`./text/append.txt`, `utf-8`, (err, data3) => {        
            console.log(data3);
            fs.writeFile('./text/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('your file has been written');
            });
        });
    });
});
console.log('Reading file...');
