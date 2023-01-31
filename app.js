let age = 40;
let userName = 'Mela';
let hobbies = ['Sports', 'Reading', 'Programming'];
let job = {
  title: 'Software Developer', 
  place: 'Hamburg', 
  salary: 60000
};

let adultYears;

function calculateAdultYears(userAge) {
  return userAge-18;
}

adultYears = calculateAdultYears(age);
alert(adultYears);
