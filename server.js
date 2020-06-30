const express = require('express');
const cors = require('cors')
const apiRouter = require('./api');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('./client/build'));
app.use('/api', apiRouter);

app.get('/', (req, res)=>{
    res.sendFile('./client/build/index.html');
})

app.listen(port, ()=>console.log(`server listening on port ${port}`));