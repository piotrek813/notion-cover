const express = require('express');
const app = express();
const {changeCover} = require('./utils/notion');

app.get('/', async (req, res) => {
    // console.log(req);
    const result = await changeCover();
    res.send(result);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})