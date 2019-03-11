const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const https = require('https');

http.createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
});
setInterval(function(){
    https.get('https://telegrambotwhichshowsome.herokuapp.com/')
},300000);


const token = '779165592:AAGwcIPKr4qua2WHW7LnPl8pvAH24RB34ps';
const bot = new TelegramBot(token, {polling: true});

// bot.onText(/\/echo (.+)/, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
//
//     const chatId = msg.chat.id;
//     const resp = match[1]; // the captured "whatever"
//
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.

bot.sendMessage(630358462, `Bot is running`);

const deadline = 1552417200;

bot.on('message', (msg) => {
    // if (msg.text === '/deadline') {
    const chatId = msg.chat.id;
    const date = new Date(msg.date * 1000);
    console.log(msg);

    const needZero = num => num > 9 ? `${num}` : `0${num}`;

    switch (msg.text) {
        case '/start':
            bot.sendMessage(chatId, 'Welcome');
            break;
        case '/deadline': {
            let hours = needZero(parseInt((deadline - msg.date) / 3600));
            let minutes = needZero(parseInt((deadline - msg.date) % 3600 / 60));
            let sec = needZero(((deadline - msg.date) % 60));
            // send a message to the chat acknowledging receipt of their message
            // bot.sendMessage(chatId, `Received your message at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

            bot.sendMessage(chatId, `Time left ${hours}:${minutes}:${sec}`);
            break;
        }
        default:
            bot.sendMessage(chatId, 'hello');
    }


    // } else {
    //     const chatId = msg.chat.id;

    // bot.sendMessage(chatId, `Hello`);
    // }
});