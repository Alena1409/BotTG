const texts = require('./texts');

require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, InputFile } = require('grammy');
const fs = require('fs');

const bot = new Bot(process.env.KEY);

//СОЗДАЛИ МЕНЮ С КОМАНДАМИ В БОТЕ
bot.api.setMyCommands([
    { command: 'start', description: 'Посмотреть контакты' },
    { command: 'wb', description: 'Доставка WB' },
    { command: 'ozon', description: 'Доставка OZON' },
    { command: 'im', description: 'Другие Интернет Магазины' },
    { command: 'owen', description: 'Доставка личных вещей' },
    { command: 'com', description: 'Коммерция, электронника' },
    { command: 'europa', description: 'Европа, Турция, Украина' },
    { command: 'doc', description: 'Документы' },
    { command: 'contacts', description: 'Контактные данные' },
    { command: 'rules', description: 'Правила' },
]);

bot.command('start', async (ctx) => {
    console.log(ctx.message);
    const startKeyboard = new Keyboard()
        .text("Доставка WB").text("Доставка OZON")
        .row().text("Другие Интернет Магазины").text("Личные вещи")
        .row().text("Коммерция, электронника").text("Европа, Турция, Украина")
        .row().text('Документы').text("Офисы и правила")//.resized();

    await ctx.replyWithPhoto(new InputFile('logo.png'));
    await ctx.reply('Привет, я бот BRING, помогу тебе разобраться.\n\nНаш <a href="https://www.instagram.com/bring__courier/">Instagram</a>\nНаш менеджер: @bring_g',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
    await ctx.reply('Следуй инструкциям или напиши свой вопрос.', {
        reply_markup: startKeyboard
    });
    // Читаем файл
    fs.readFile('usome.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }
 
        // Создаем строку для нового контакта
        const newContact = [ctx.message.from.id, ctx.message.from.first_name, ctx.message.from.username, ctx.message.text].join(',');

        // Проверяем, существует ли контакт в файле
        const lines = data.split('\n');
        let contactExists = lines.some(line => line.includes(ctx.message.from.id));

        if (!contactExists) {
            // Если контакт не найден, добавляем его в файл
            fs.appendFile('usome.txt', '\n' + newContact, (err) => {
                if (err) {
                    console.error('Ошибка при записи в файл:', err);
                    return;
                }
                console.log('Контакт добавлен успешно');
            });
        } else {
            console.log('Контакт уже существует');
        }
    });
});

//WB and OZON
bot.command('wb', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 5-12 дней', 'expresswb').row().text('Эконом 20 gel/kg, 15-17 дней', 'economwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Доставка WB', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 5-12 дней', 'expresswb').row().text('Эконом 20 gel/kg, 15-17 дней', 'economwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager,  { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.command('ozon', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 5-12 дней', 'expressozon').row().text('Эконом 20 gel/kg, 15-17 дней', 'economoz');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Доставка OZON', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 5-12 дней', 'expressozon').row().text('Эконом 20 gel/kg, 15-17 дней', 'economoz');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('expressozon', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.expressozon, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('expresswb', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.expresswb, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('economwb', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.economwb, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('economoz', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.economoz, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//ДРУГИЕ ИНТЕРНЕТ МАГАЗИНЫ
bot.command('im', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 5-12 дней', 'expressim').row().text('Эконом 20 gel/kg, 15-17 дней', 'economim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Другие Интернет Магазины', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 5-12 дней', 'expressim').row().text('Эконом 20 gel/kg, 15-17 дней', 'economim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.callbackQuery('expressim', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.expressim, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('economim', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.economim, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//Личные вещи
bot.command('owen', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 10-15 дней', 'expressowen').row().text('Эконом 20 gel/kg, 15-20 дней', 'economowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Личные вещи', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 24 gel/kg, 10-15 дней', 'expressowen').row().text('Эконом 20 gel/kg, 15-20 дней', 'economowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.callbackQuery('expressowen', async (ctx) => {

    await ctx.answerCallbackQuery();
    await ctx.reply(texts.expressowen, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderDelivery, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('economowen', async (ctx) => {

    await ctx.answerCallbackQuery();
    await ctx.reply(texts.economowen, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderDelivery, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//Доставкав в Европу
bot.command('europa', async (ctx) => {

    await ctx.reply(texts.europa, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderEuropa, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Европа, Турция, Украина', async (ctx) => {

    await ctx.reply(texts.europa, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderEuropa, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//Коммерческий тариф
bot.command('com', async (ctx) => {

    await ctx.reply(texts.comertion, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderDelivery, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Коммерция, электронника', async (ctx) => {

    await ctx.reply(texts.comertion, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderDelivery, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//документы
bot.command('doc', async (ctx) => {

    await ctx.reply(texts.documents, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderDelivery, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Документы', async (ctx) => {

    await ctx.reply(texts.documents, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderDelivery, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//контакты
bot.command('contacts', async (ctx) => {

    await ctx.reply(texts.addresses.batumi, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.631546, 41.603927);

    await ctx.reply(texts.addresses.tbilisi, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.719451, 44.802999);

    const keyboard = new InlineKeyboard().text('Правила', 'rules');

    await ctx.reply('Ознакомиться с правилами:', {
        reply_markup: keyboard
    });

    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Офисы и правила', async (ctx) => {
    
    await ctx.reply(texts.addresses.batumi, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.631546, 41.603927);

    await ctx.reply(texts.addresses.tbilisi, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.719451, 44.802999);

    const keyboard = new InlineKeyboard().text('Правила', 'rules');

    await ctx.reply('Ознакомиться с правилами:', { 
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//Правила
bot.command('rules', async (ctx) => {
    await ctx.reply(texts.rules, {parse_mode: 'HTML', disable_web_page_preview: true});
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });

});

bot.callbackQuery('rules', async (ctx) => {

    await ctx.answerCallbackQuery();
    await ctx.reply(texts.rules, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
})

//удаление соообщений человека из списка
const blockedUsers = [5733496893];

bot.on('message', async (ctx) => {
    if (!ctx.from) return;

    // Проверяем, заблокирован ли пользователь
    if (blockedUsers.includes(ctx.from.id)) {
        await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
        console.log(`Игнорирование сообщения от заблокированного пользователя ${ctx.from.id}`);
        // Не отправляем никаких сообщений
        return;
    }

    // Здесь вы можете добавить логику для обработки сообщений от пользователей, которые не заблокированы
    // Например, ответить на сообщение
    // await ctx.reply('Спасибо за ваше сообщение!');
    console.log(ctx.from.id)
    // Читаем файл
    fs.readFile('usome.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }

        // Создаем строку для нового контакта
        const newContact = [ctx.message.from.id, ctx.message.from.first_name, ctx.message.from.username, ctx.message.text].join(',');

        // Проверяем, существует ли контакт в файле
        const lines = data.split('\n');
        let contactExists = lines.some(line => line.includes(ctx.message.from.id));

        if (!contactExists) {
            // Если контакт не найден, добавляем его в файл
            fs.appendFile('usome.txt', '\n' + newContact, (err) => {
                if (err) {
                    console.error('Ошибка при записи в файл:', err);
                    return;
                }
                console.log('Контакт добавлен успешно');
            });
        } else {
            console.log('Контакт уже существует');
        }
    });
});
//ОБРОБОТЧИК ОШИБОК
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

console.log('bot starting')
bot.start();