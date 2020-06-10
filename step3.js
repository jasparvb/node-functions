const fs = require('fs');
const axios = require('axios');
const process = require('process');
const argv = process.argv;
let writePath = '';

function cat(path, writePath) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            makeOutput(data, writePath);
        }
    });
}

async function webCat(url, writePath) {
    try {
        let response = await axios.get(url);
        makeOutput(response.data, writePath);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

function makeOutput(data, writePath) {
    if(writePath){
        fs.writeFile(`./${writePath}`, data, "utf8", function(err) {
            if (err) {
              console.error(`Couldn't write ${writePath}: ${err}`);
              process.exit(1);
            }
            console.log(`# no output, but ${writePath} contains contents of ${argv[4]}`);
          });
          console.log('writing file...');
    } else {
        console.log(data);
    }
}


if(argv[2] === "--out") {
    argv[4].includes(".txt") ? cat(argv[4], argv[3]) : webCat(argv[4], argv[3]);
} else {
    argv[2].includes(".txt") ? cat(argv[2], writePath) : webCat(argv[2], writePath);
}