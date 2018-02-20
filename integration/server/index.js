const express = require('express');
const app = express();


app.use(express.static('static'));

app.get('*', (req, res) => {
    res.redirect('/');
});

app.post('*', (req, res) => {
    res.redirect('/');
});

app.put('*', (req, res) => {
    res.redirect('/');
});


app.listen(8000, () => {
    console.log('Integration Test server running on localhost:8000');
});
