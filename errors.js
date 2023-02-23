const fs = require('fs');

function readFile() {
    try {
        const fileData = fs-fs.readFileSync('data.json');
    } catch {
        console.log('An error occured.');
    }
    console.log('function executed');
}

readFile();

