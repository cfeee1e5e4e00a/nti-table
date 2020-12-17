const express = require('express');
const app = express();
const vk = require('./vk.js');
const cors = require('cors');

app.use(cors());

app.get('/api/randoms', async (req, res) => {
    let text = await vk.getRandomUsers(10);
    res.send({ users: text });
});

// app.use(express.static('client'));

app.listen(8080);
