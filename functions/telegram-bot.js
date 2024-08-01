const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const body = JSON.parse(event.body);

  if (!body.message) {
    return { statusCode: 400, body: 'Bad Request: No message in body' };
  }

  const chatId = body.message.chat.id;
  const text = body.message.text;

  if (text === '/getchatid') {
    const response = `Your Chat ID is: ${chatId}`;
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: response
    });

    return { statusCode: 200, body: 'OK' };
  }

  return { statusCode: 200, body: 'OK' };
};
