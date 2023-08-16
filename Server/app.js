const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//dotenv.config({ path: './server/model/config.env' });
const Tour = require('./model/userSchema');


app.use(express.json());
app.use(require('./router/auth'));
app.use(bodyParser.json());

const connectDB = require('./model/conn2');
connectDB();


app.get('/', (req, res) => {
  res.send('Hello world'); //routing
});


//---------------------------------------------------------------------------------------------------



const port = 3000;


app.post('/api/tours', (req, res) => {
    const tourData = req.body;
  
    // Create a new tour using the Tour model
    const newTour = new Tour(tourData);
  
    // Save the tour to MongoDB using promises
    newTour.save()
      .then(savedTour => {
        res.status(201).json(savedTour);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
