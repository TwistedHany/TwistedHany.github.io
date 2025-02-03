
const jsonString = '{"name": "Franko", "age": 20, "city": "Taguig"}';

const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name); 
console.log(jsonObject.age); 

// Convert JavaScript object back to JSON string
const newJsonString = JSON.stringify(jsonObject);
console.log(newJsonString); 