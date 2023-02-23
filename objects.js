class Job {
    constructor(title, city, salary) {
        this.title = title;
        this.city = city;
        this.salary = salary;
    }

    describe() {
        console.log(`I'm a ${this.title} in ${this.city} and I earn ${this.salary}.`);
    }
}

const dev = new Job('Developer', 'New York', 50000);
const cook = new Job('Cook', 'Munich', 35000);
cook.describe();