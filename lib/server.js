const express = require('express');
const app = express();
const routes = require('./routes/route');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/tripJournals';
const PORT = 9000;
// const tripSeeds = require('./seeds/create_trips')
// const journalSeeds = require('./seeds/create_journals')

mongoose
    .connect(uri)
    .then(() => {
      console.log(`Successfully connected to ${uri}`)
    //   tripSeeds()
    //   journalSeeds()
    })
    .catch(err => console.log(err.message))

app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});