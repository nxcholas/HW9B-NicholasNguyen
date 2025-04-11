const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser for JSON
const app = express();
const port = process.env.PORT || 3000; // Use dynamic port for Azure

// Middleware to parse the body of POST requests
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this to handle JSON data for POST requests

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'css' folder
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to serve ex1.html
app.get('/ex1', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ex1.html'));
});

// Handle the POST request for /ex1 (form submission)
app.post('/ex1', (req, res) => {
  const { name, email, payment, promotions, location } = req.body;
  const promotionStatus = promotions ? 'ON' : 'OFF';
  
  // Render the message or handle the form data here
  res.send(`<h2>${name}, thank you for your order. We will keep you posted on your delivery status at ${email}</h2>`);
});

// Route to serve ex2.html (Add this route for ex2)
app.get('/ex2', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ex2.html'));
});

// New route to handle POST requests for traveler information (ex2)
app.post('/api/countries', (req, res) => {
  const { name, countries } = req.body;
  
  // Handle the traveler information and countries data
  const numberOfCountriesVisited = countries.length;

  // Respond with a confirmation message
  res.json({
    message: `${name}, thank you for submitting your countries visited. You have visited ${numberOfCountriesVisited} countries.`
  });
});

// Route to serve ex3.html (Add this route for ex3)
app.get('/ex3', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ex3.html'));
});

// Array to hold articles (temporary storage)
let articles = [];

// Function to get the max ID from articles
const getMaxId = () => {
  return articles.length > 0 ? Math.max(...articles.map(article => article.id)) : 0;
};

// Route to handle POST requests for new articles
app.post('/articles', (req, res) => {
  const { title, content } = req.body;
  
  // Generate new article ID
  const newId = getMaxId() + 1;

  // Create the new article object
  const newArticle = {
    id: newId,
    title: title,
    content: content
  };

  // Add the new article to the articles array
  articles.push(newArticle);

  // Respond with the title and ID of the new article
  res.send(`<h2>New article added successfully with the title  "${newArticle.title}"and ID ${newArticle.id}</h2>`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
