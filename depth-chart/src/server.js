import express from "express";
import cors from "cors";
import {Spot} from "@binance/connector";

const app = express();
const port = 4080;
const apiKey = 'WN7xP7X3ukwSp1R44kJRSNuuNCABKApPmZB3AiMeICtZ8PApySCBjaVZexiB6gSh'
const apiSecret = 'zvyyrqZNUvmJOw0m3rfe8qCFYEEURqFIGNRGAcCu6ZBnQne0RnMKEOWbSQBdUPf2'
const client = new Spot(apiKey, apiSecret)
  
app.use(cors());

app.get('/depth', async (req, res) => {
    try {
        const pair = req.query.pair || 'btcusdt';
        const response = await client.depth(pair, { limit: 10 });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})