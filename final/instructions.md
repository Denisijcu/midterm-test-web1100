# WEB2010 Final Exam

1. In the app.js file, use $.ajax() with the dog_api to get an array of all the dog breeds. Read the API docs (https://dog.ceo/dog-api/) to figure out which URL you should use. Log the response to the console. The response should have a "message" property, which should be an Object that contains all the dog breeds as its properties.

2. For each dog breed, create an '<option value=""></option>' HTML element (with javascript) and place it inside the select element. Each option element should have a breed for its text content and the same breed for its value attribute. If it works correctly, the select element will show a dropdown list of dog breeds when you click on it.

3. When a user clicks on the viewDog button, create a variable called breedName and assign to it the value of the select element (the selected dog breed). Log the breedName to the console to make sure it has the selected dog breed.

4. Inside the click listener, Use $.ajax() to get a random image of the selected breed. Look at the Dog API docs under the "By Breed" section (https://dog.ceo/dog-api/#breed) to figure out what $.ajax's url property should be. HINT: You will need to use the breedName variable in the url. Log the response to the console to make sure it has an image URL in the message property, then delete this console log.

5. Using the setAttribute function (https://www.w3schools.com/Jsref/met_element_setattribute.asp), set the img element's src attribute to the image URL from inside response.message. If it works correctly, this will display an image of a dog on the page.
