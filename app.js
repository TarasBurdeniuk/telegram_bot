const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const kelvinToCelsius = require('kelvin-to-celsius');

const token = '708659022:AAGVfqTmwavAJg_gI4sZxRo0BnoRA9vD_PI';
const bot = new TelegramBot(token, {polling: true});

const http = require('http');
const https = require('https');

http.createServer().listen(process.env.PORT || 3030).on('request', function(req, res){
    res.end('')
});
setInterval(function(){
    https.get('https://telegrambotwhichshowsome.herokuapp.com/')
},300000);

// bot.onText(/\/start/, msg => {
//     const chatId = msg.chat.id;
//
//     bot.sendMessage(chatId, 'Please, enter city which you can see weather forecast');
// });
//
// bot.onText(/\/forecast/, msg => {
//     const chatId = msg.chat.id;
//
//     bot.sendMessage(chatId, 'enter city which you can see weather forecast');
// });

bot.on('message', msg => {
    const id = msg.chat.id;

    if (msg.text === '/forecast' || msg.text === '/start') {
        bot.sendMessage(id, 'Enter a city to find out the weather forecast');
        return;
    }

    request(`https://api.openweathermap.org/data/2.5/weather?q=${msg.text}&APPID=acb6d7f748d151361776b3eb027109c0`, function (err, response, body) {
        // if (err) {
        //     throw new Error ('Something happen!');
        // }

        let code = JSON.parse(response.body);

        if (code.cod === '404') {
            bot.sendMessage(id, 'Not valid city');
            return;
        }

        const data = JSON.parse(body);

        let message = `
        *Forecast in ${data.name}*
        Description: _${data.weather[0].description}_
        Pressure: _${data.main.pressure}hPa_
        Temperature: _${kelvinToCelsius(data.main.temp)}C_
        Humidity: _${data.main.humidity}%_
        Wind speed: _${data.wind.speed}meter/sec_
        `;

        bot.sendMessage(id, message, {parse_mode: 'Markdown'});
    })
});