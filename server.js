const express = require('express');
const cors = require('cors')
var fs = require('fs');
const app = express();
const port = 8000;
const gravity = 9.8;
let results = [];

app.use(express.static('./client/build'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.sendFile('./client/build/index.html');
})

app.get('/api/history', (req, res)=>{
    results = results.slice(-10);
    let resSned = [...results];
    resSned.reverse();
    res.json({
        results: resSned
    })
})

app.post('/api/data', (req, res)=>{
    const height = parseInt(req.body.height);
    const coff = parseFloat(req.body.coff);
    const result = [];
    result.push({x: 0, y: height});
    let totalTime = 0;
    for (let i = 0; i < 10; i++){
        totalTime += Math.pow(coff, i)*(Math.sqrt(2*gravity*height)/gravity)
        result.push({x: totalTime, y: 0});
        totalTime += Math.pow(coff, i + 1)*(Math.sqrt(2*gravity*height)/gravity)
        result.push({x: totalTime, y: ( Math.pow(coff, 2*(i+1)) * height )});
    }
    results.push({
        height,
        coff,
        result
    })
    res.json({
        result: result
    });
})

app.listen(port, ()=>console.log(`server listening on port ${port}`));