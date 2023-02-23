// optional parameter
function greetUser(username='mela Letics') {
    console.log(`Hi ${username}`);
}

greetUser('Testuser');
greetUser();

// rest operator -> unknown amout of parameter to array
function sumUp(...numbers) {
    let result = 0;
    for (const number of numbers){
        result += number;
    }
    return result;
}

console.log(sumUp(1, 2, 4));
console.log(sumUp(0, 5, 6, 3, 5, 2, 1));

const inputNumbers = [0, 5, 6, 3, 5, 2, 1];
// spread operator -> array to parameter list
console.log(sumUp(...inputNumbers));