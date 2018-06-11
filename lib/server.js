const app = require('express')();
const routes = require('./routes/route');
const PORT = 9000;

app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});