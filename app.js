const express = require('express');
const app = express();
const {changeCover} = require('./utils/notion');
const {uploadImg, getTransformedImg} = require('./utils/cloudinary');

app.get('/setup', async (req, res) => {
    uploadImg(path.join(__dirname, 'assets/bg.png'));
})

app.get('/', async (req, res) => {
    const today = new Date();
    const imgUrl = getTransformedImg(today.toLocaleDateString());
    const result = await changeCover(imgUrl);
    res.send(result);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})
