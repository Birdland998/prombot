const line = require('@line/bot-sdk');

// สร้างไลน์ Client
const config = {
  channelAccessToken: 'oUpa84m/6Sjcw/50u2nrmvUDJI8gCogVxHm6KxAYP/mSAkXeHWTPZHOa+lTj0tvnyd1TdzDMaJG8gUbYEBT/mbtKtzjkiq2jKmXfPiG3Gbm6OXd74RzP3qtmtGLy0YyFWySxsdEA7zwBiKo0BjpktgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'U261a199c4aae7af2958adaf192786014',
};

const client = new line.Client(config);

// สร้างเซิร์ฟเวอร์ Express.js เพื่อรับ Webhook
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ประมวลผลข้อความจากไลน์
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  events.forEach((event) => {
    if (event.type === 'message' && event.message.type === 'text') {
      const userId = event.source.userId;
      const text = event.message.text;

      // ประมวลผลข้อความและส่งโค้ดกลับไปยังไลน์บอท
      processText(userId, text);
    }
  });

  res.sendStatus(200);
});

// ฟังก์ชันประมวลผลข้อความและส่งโค้ดกลับไปยังไลน์บอท
async function processText(userId, text) {
  if (text === 'Qr') {
    // รูปภาพที่ต้องการส่ง
    const imageUrl = 'https://i.pinimg.com/750x/5f/fe/66/5ffe66015b9d8000a8ef264aa7f4a595.jpg';

    // ส่งรูปภาพกลับไปยังไลน์บอท
    await client.pushMessage(userId, { type: 'image', originalContentUrl: imageUrl, previewImageUrl: imageUrl });
  } else {
    await client.pushMessage(userId, { type: 'text', text: 'Sorry, I cannot send pictures for that request.' });
  }
}

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
