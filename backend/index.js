const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/connection'); // Assuming this handles your MongoDB connection setup

const app = express();


app.use(bodyParser.json());
app.use(cors());


const ruleRoutes = require('./routes/rules');
app.use('/api/rules', ruleRoutes);


db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


module.exports = app;
