const youtubesearchapi = require("youtube-search-api");
const express = require("express")
const app = express()
app.use(express.json());
const cors = require('cors');

async function hello(text) {
    try {
        const a = await youtubesearchapi.GetListByKeyword(`${text}`, [false], [3], [{type: "video"}]);
        return a;
    } catch (error) {
        console.error("Error in fetching YouTube data:", error);
        return { error: "Failed to fetch YouTube data" };
    }
}

app.get('/', async (req, res) => {
    try {
        var jsonData =''
        if(req.query.text) jsonData = await hello(req.query.text);
        res.json(jsonData);
    } catch (error) {
        console.error("Error in processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(8000, () => {
    console.log('connected.....');
});
