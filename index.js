const fs = require('fs');

//Syn is for Syncronous version of file reading
const txtIn = fs.readFileSync('./input.txt', "utf-8");
console.log(txtIn);

const txtOut = 'This is what is known about the avocado: ${txtIn}. \nCreated on ${Date.now()}';
fs.writeFileSync('./txtOut.txt', txtOut);

console.log('Data has been written onto the file');