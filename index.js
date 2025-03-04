// index.js
const express = require('express');
const { Client } = require('@line/bot-sdk');
const gemini = require('./gemini'); // import gemini functions
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

app.post('/webhook', express.json(), async (req, res) => {
  const events = req.body.events;

  if (events.length > 0) {
    const event = events[0];

    if (event.type === 'message' && event.message.type === 'text') {
      const text = event.message.text;
      const replyToken = event.replyToken;

      // Call Gemini API to process the text or PDF
      const response = await gemini.processText(text);

      // Reply with the processed result
      client.replyMessage(replyToken, { type: 'text', text: response });
    }
  }

  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});