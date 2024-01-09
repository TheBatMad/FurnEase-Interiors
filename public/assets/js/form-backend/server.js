const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/formDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
  phone: String,
});

const User = mongoose.model('User', userSchema);

app.post('/submit-form', (req, res) => {
  const { name, email, city, phone } = req.body;

  const newUser = new User({ name, email, city, phone });

  newUser.save()
    .then(() => {
      res.send('Form data submitted successfully!');
    })
    .catch((err) => {
      res.status(400).send('Error submitting form data.');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/formDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



