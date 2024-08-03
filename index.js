require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, InputFile} = require('grammy');

const bot = new Bot (process.env.KEY);

//СОЗДАЛИ МЕНЮ С КОМАНДАМИ В БОТЕ

bot.api.setMyCommands([
    {command: 'start', description: 'Запустить бота'},
    {command: 'contacts', description: 'Получить контакты'},
    {command: 'share', description: 'Передать контакты'},
    {command: 'menu', description: 'Открыть меню'},
]);
//

bot.command('start', async (ctx) => {
    const startKeyboard = new Keyboard().text("СДЭК").text("WB").text("OZON").row().text("Узнать информацию о компании").row().text("Написать оператору").row().text("Написать пожелания").resized();

    await ctx.replyWithPhoto(new InputFile('logo.png'));
    await ctx.reply('Привет, я бот BRING, помогу тебе разобраться. Жми на кнопку:',{
        reply_markup: startKeyboard
    });
});

bot.command('share', async (ctx) => {
    const shareKeyboard = new Keyboard().requestLocation('Геолокация').row().requestContact('Контакт').row().requestPoll('Опрос').row().placeholder('Укажи данные...').resized();

    await ctx.reply('Какими данными хочешь поделиться данными?',{
        reply_markup: shareKeyboard
    })
})

bot.on(':contact', async (crx) => {
    await crx.reply('Спасибо за контакт')
})

bot.command('contacts', async (ctx) => {
    await ctx.react('👌')
    await ctx.reply('Наш <a href="https://kon-express.ru/">сайт</a>\nНаш <a href="https://www.instagram.com/bring__courier/">Instagram</a>\nНаш менеджер: @bring_g',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.command('menu', async (ctx) => {
    const menuKeyboard = new InlineKeyboard().text('1', 'btn1').text('2', 'btn2').text('3', 'btn3');

    await ctx.reply('push', {
        reply_markup: menuKeyboard
    });
});

bot.callbackQuery(['btn1', 'btn2', 'btn3'], async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('good');
})

///////////////////
//РЕАКЦИЯ НА КОНКРЕТНОЕ СЛОВО

bot.hears('СДЭК', async (ctx) => {
    await ctx.reply('Даю инфо по СЭК')
})
bot.hears('WB', async (ctx) => {
    await ctx.reply('Даю инфо по WB')
})
bot.hears('OZON', async (ctx) => {
    await ctx.reply('Даю инфо по OZON')
})
bot.hears('Узнать информацию о компании', async (ctx) => {
    await ctx.reply('Даю инфо о компании')
})
bot.hears('Написать оператору', async (ctx) => {
    await ctx.reply('Напиши нашему менеджеру: @bring_g')
})
bot.hears('Написать пожелания', async (ctx) => {
    await ctx.reply('Пиши')
})



///////////////////
//РЕАКЦИЯ НА ЛЮБОЙ ТЕКСТ СЛОВО

bot.on('message:text', async (ctx) => {
    await ctx.reply('/start');
});

///////////////////
//ОБРОБОТЧИК ОШИБОК
///////////////////

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
    } else {
        console.error('Unknown error:', e);
    }
})
///////////////////

bot.start();