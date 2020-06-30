const express = require('express');
const computeData = require('./computeData');
const util = require('util');
var fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
let results = {
    pages: 1,
    requests: []
};

const router = express.Router();

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

router.get('/history', async (req, res)=>{
    await readFile();
    res.json(results);
})

router.post('/data', async (req, res)=>{
    try{
        const height = req.body.height;
        const coff = req.body.coff;

        const result = computeData(height, coff);

        await readFile();
        results.requests.push({ height, coff, result });
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

module.exports = router;