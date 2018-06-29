const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const uri = 'mongodb://localhost:27017/tripJournals';
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use((err, req, res, next) => {
    res.status(500).json({ err: err.toString() })
})

app.use(bodyParser.json())
app.use('/api', routes);
app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    await mongoose
        .connect(uri)
        .then(() => {
          console.log(`Successfully connected to ${uri}`);
        })
        .catch(err => console.log(err.message))
});