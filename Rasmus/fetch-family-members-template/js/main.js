// =========== Product functionality =========== //
/*
global variable: _familyMembers
*/
let _familyMembers = [];

/*
Fetches json data from the file persons.json
*/
fetch('json/persons.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    console.log(jsonData);
    _familyMembers = jsonData; // storing my json data in a global variable for later use. 
    appendPersons(_familyMembers);
  });

/*
Appends json data to the DOM
*/
function appendPersons(persons) {
  // todo: append all persons to the DOM using a for-of loop
}