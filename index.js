
require('dotenv').config({ path: '.env.local' });
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT;
const measurementId = process.env.measurement_id;
const apiSecret = process.env.api_secret;


app.use(express.json());


app.post('/deal', async (req, res) => {    
    const event = req.body.event.replace('.', '_');
    const user_id = req.body.current['08f603bf9e0032d5a9f9e5cd39ca8c7a4374ac82'];
    console.log('new event from pipedrive', req.body);
    console.log('event_name_log', event);
    console.log('user_id_log', user_id);
    
    if (!user_id) {
        console.log('user_id is empty, null, or undefined. Skipping event sending.');
        return res.status(400).send('No user_id provided');
    }

    const eventData = {
        "client_id": `${user_id}`,
        "events": [
            {
                "name": `${event}`,
                "params": {}
            }
        ]
    };

    try {
        const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
        const response = await axios.post(url, eventData);
        console.log(eventData);
        console.log('success', response.data);
        res.status(200);
        res.status(200).send('success to GA4');
    } catch (error) {
        console.error('error', error);
        res.status(500).send('error');
    }
});

app.post('/person', async (req, res) => {
    const event = req.body.event.replace('.', '_');
    const user_id = req.body.current['ebb6db2fbeeb598c1ba3e60ccd24801756d81633'];
    console.log('new event from pipedrive', req.body);
    console.log('event_name_log',event);
    console.log('user_id_log',user_id);
    
    if (!user_id) {
        console.log('user_id is empty, null, or undefined. Skipping event sending.');
        return res.status(400).send('No user_id provided');
    }
    
    const eventData = {
        "client_id": `${user_id}`,
        "events": [
            {
                "name": `${event}`,
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
 
