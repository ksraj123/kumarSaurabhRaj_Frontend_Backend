const express = require('express');
const util = require('util');
const cors = require('cors')
var fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const app = express();
const port = 8000;
const gravity = 9.8;
let results = {
    pages: 1,
    requests: []
};

app.use(express.static('./client/build'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.sendFile('./client/build/index.html');
})

const readFile = async () => {
    try {
        const data = await readFileAsync('data.json');
        results = JSON.parse(data.toString());
    } catch(err){
        if (err.code === 'ENOENT'){
            fs.writeFile("data.json", JSON.stringify(results), err => { 
                if (err) console.log(err);
            });
            readFile();
        } else {
            console.log(err);
            return;
        }
    }
}

app.get('/api/history', async (req, res)=>{
    await readFile();
    res.json(results);
})

app.post('/api/data', async (req, res)=>{
    try{

    
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
    await readFile();
    results.requests.push({
        height,
        coff,
        result
    })
    results.pages = Math.ceil(results.requests.length / 10);
    fs.writeFile("data.json", JSON.stringify(results), err => { 
        if (err) console.log(err);
    });
    res.json({
        result: result
    });
    } catch(err){
        console.log(err);
    }
})

app.listen(port, ()=>console.log(`server listening on port ${port}`));