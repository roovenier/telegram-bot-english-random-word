const { Telegraf } = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const getWords = require('./get-words.js');

require('dotenv').config();

const main = async () => {
    const words = await getWords();

    const formKeyboards = ({ word }) => {
        const keyboard = Markup.inlineKeyboard([
            Markup.urlButton('Word Definition', `https://www.oxfordlearnersdictionaries.com/definition/english/${word}`),
            //Markup.callbackButton('Test', word),
        ]);

        return keyboard;
    };

    const bot = new Telegraf(process.env.BOT_KEY)
    bot.start((ctx) => ctx.reply('Welcome!\n\nThere are following commands you can use:\n*word*: show random word', Extra.markdown()))
    bot.hears(/^word$/i, (ctx) => {
        const randomNumber = Math.floor(Math.random() * (2999 - 0) + 0);
        const word = words[randomNumber];

        ctx.reply(`The word is: *${words[randomNumber]}*`, Extra.markdown().markup(formKeyboards({ word })));
    })
    bot.on('callback_query', (ctx) => {
        ctx.telegram.answerCbQuery(ctx.callbackQuery.id)
        ctx.reply('some callback')
    })
    bot.launch()
};

main();