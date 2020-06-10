const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
          console.log("Error reading ", path);
          console.error(err);
          process.exit(1);
        }
        console.log(data);
    });
}

function webCat(url) {
    axios.get(url)
    .then(resp => console.log(resp.data))
    .catch(err => console.log("Error fetching ", url, err));
}

argv[2].includes(".txt") ? cat(argv[2]) : webCat(argv[2]);