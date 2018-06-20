const express = require('express');
const app = express();
const routes = require('./routes/route');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/tripJournals';
const PORT = 9000;

mongoose.connect(uri);

app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});