const fs = require('fs/promises');

/*
function readFile() {

    //   Approach 1
    // 
    //    fs.readFile('data.txt' ,function(error, fileData){
    //        if (error) {
    //        //    ...
    //        }
    //         console.log(fileData.toString());
    //        console.log('Parsing done')
    //    });     
    

    // Approach 2
    fs.readFile('data.txt').then(function(fileData) {
        console.log(fileData.toString());
        console.log('Parsing done')
    }).catch(function(error){
        console.log(error);
    });

    console.log('This info should not be hold back! It\'s so important.');
}
*/

// Approach 3

async function readFile() {
    try {
        const fileData = await fs.readFile('data.txt');
    } catch (e) {
        console.log(e);
    }
    console.log(fileData.toString());
    console.log('Parsing done');
    console.log('This info should not be hold back! It\'s so important.');
}

readFile();

