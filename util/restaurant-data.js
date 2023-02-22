const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname,'..','data', 'restaurants.json');

function getStoredRestaurants() {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

function storeRestaurants(restaurants) {
    fs.writeFileSync(filePath, JSON.stringify(restaurants));
}


module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
};