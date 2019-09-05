const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  Recipe.create({ 
    title: 'Glazed Chicken',
    level: 'Brandy',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'Asian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePopu'
  })
  .then(user => { console.log('The user is saved and its value is: ', user) })
  .catch(err => { console.log('An error happened:', err) });

  Recipe.insertMany(data)
  .then(rec => {
    console.log('Added all recipes!')
    for(let item of data){
      console.log(item.title)
    }
    })
  .catch(error => {
    console.log('Got an error adding')
  });

  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(rec => {
    console.log('Updated the Rigatoni!')
    })
  .catch(error => {
    console.log('Got an error updating')
  });

  Recipe.deleteOne({ title: "Carrot Cake"})
  .then(rec => {
    console.log('Deleted the Carrot Cake')
    mongoose.disconnect();
    console.log('Mongoose disconnected')
    })
  .catch(error => {
    console.log('Got an error deleting')
  });

  