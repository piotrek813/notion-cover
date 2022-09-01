const express = require('express');
const app = express();
const {changeCover} = require('./utils/notion');

app.get('/', (req, res) => {
    console.log(req);
    changeCover();
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})