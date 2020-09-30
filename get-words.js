const fs = require('fs');
const { parse } = require('fast-csv');

let result = [];

const getWords = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream('words.csv')
            .pipe(parse())
            .on('error', error => reject(error))
            .on('data', row => result = [...result, ...row])
            .on('end', () => resolve(result))
    });
}

module.exports = getWords;