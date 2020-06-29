const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;
const results = [];
const gravity = 9.8;

app.use(express.json());
app.use(cors());

app.get('/api/pastresults', (req, res)=>{
    res.json({
        results: results
    })
})

app.post('/api/data', (req, res)=>{
    const height = parseInt(req.body.height);
    const coff = parseFloat(req.body.coff);
    console.log(coff);
    const result = [];
    result.push({x: 0, y: height});
    let totalTime = 0;
    // result.push({x: 0, y: 0})
    // let
    for (let i = 0; i < 10; i++){
        totalTime += Math.pow(coff, i)*(Math.sqrt(2*gravity*height)/gravity)
        result.push({x: totalTime, y: 0});
        totalTime += Math.pow(coff, i + 1)*(Math.sqrt(2*gravity*height)/gravity)
        result.push({x: totalTime, y: ( Math.pow(coff, 2*(i+1)) * height )});
    }
    res.json({
        result: result
    });
})

app.listen(port, ()=>console.log(`server listening on port ${port}`));