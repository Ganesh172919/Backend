import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(4321, () => {
    console.log('server is runnning on  http://localhost:4321');
})



