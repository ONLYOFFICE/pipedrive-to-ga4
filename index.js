require('dotenv').config({ path: '.env.local' });
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT;
const measurementId = process.env.measurement_id;
const apiSecret = process.env.api_secret;


app.use(express.json());


app.post('/webhook', async (req, res) => {
    const event = req.body.event
    const user_id = req.query.user_id;
    console.log('new event from pipedrive', req.body);
    console.log('event_name',event);
    
    const eventData = {
        "client_id": `${user_id}`,
        "events": [
            {
                "name": "convert_to_deal",
                "params": {
                }
            }
        ]
    };

    
    try {
        const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
        const response = await axios.post(url, eventData);
        console.log(eventData);
        console.log('success', response.data);
        res.status(200).send('success to GA4');
    } catch (error) {
        console.error('error', error);
        res.status(500).send('error');
    }
});

app.listen(port, () => {
    console.log(`server start on http://localhost:${port}`);
});
