const texts = require('./texts');

require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, InputFile } = require('grammy');
const { apiThrottler } = require('@grammyjs/transformer-throttler');
const fs = require('fs');

const bot = new Bot(process.env.KEY);

bot.api.config.use(apiThrottler()); //помогает не заблокировать рассылку

const ADMIN_IDS = [973299977, 835352092];

function getUserIds(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data
            .split('\n')
            .map((line) => line.trim().split(',')[0])
            .filter(Boolean)
            .map((id) => Number(id))
            .filter((id) => Number.isInteger(id) && id > 0);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return [];
    }
}

// Общая функция рассылки — чтобы не дублировать код
async function sendBroadcast(ctx, filePath) {
    if (!ctx.from) return;

    if (!ADMIN_IDS.includes(ctx.from.id)) {
        return ctx.reply('⛔ Нет доступа');
    }

    const message = ctx.match;

    if (!message) {
        return ctx.reply('Укажи текст рассылки.\n\nПример:\n/promo Новый тариф 🚀');
    }

    const users = getUserIds(filePath);

    if (users.length === 0) {
        return ctx.reply('❌ Список пользователей пуст');
    }

    await ctx.reply(`📤 Начинаю рассылку для ${users.length} пользователей...`);

    let success = 0;
    let failed = 0;

    for (const id of users) {
        try {
            await bot.api.sendMessage(id, message, { parse_mode: 'HTML' });
            success++;
        } catch (err) {
            console.error(`Не удалось отправить ${id}:`, err.description || err.message);
            failed++;
        }
    }

    await ctx.reply(
        `📢 Рассылка завершена\n` +
        `👥 Всего: ${users.length}\n` +
        `✅ Отправлено: ${success}\n` +
        `❌ Ошибок: ${failed}`
    );
}

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
    await ctx.reply('Привет, я бот BRING, помогу тебе разобраться.\n\nНаш <a href="https://www.instagram.com/bring__courier/">Instagram</a>\nНаш менеджер: @bring_g\n<a href="https://trackingcenter.space/">Трекинг</a>',
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
        const id = String(ctx.message.from.id);
        let contactExists = lines.some(line => line.startsWith(id + ',') || line.trim() === id);

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

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiwb').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Доставка WB', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiwb').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.command('ozon', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiozon').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiozon');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Доставка OZON', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiozon').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiozon');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('batumiozon', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.batumiozon, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('batumiwb', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.batumiwb, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('tbilisiwb', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.tbilisiwb, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('tbilisiozon', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.tbilisiozon, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//ДРУГИЕ ИНТЕРНЕТ МАГАЗИНЫ
bot.command('im', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiim').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Другие Интернет Магазины', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiim').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.callbackQuery('batumiim', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.batumiim, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('tbilisiim', async (ctx) => {

    await ctx.answerCallbackQuery();

    await ctx.reply(texts.tbilisiim, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrder, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//Личные вещи
bot.command('owen', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiowen').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.hears('Личные вещи', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Батуми 24 gel/kg, 5-15 дней', 'batumiowen').row().text('Тбилиси 22 gel/kg, 5-15 дней', 'tbilisiowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.callbackQuery('batumiowen', async (ctx) => {

    await ctx.answerCallbackQuery();
    await ctx.reply(texts.batumiowen, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.sendOrderDelivery, { parse_mode: 'HTML', disable_web_page_preview: true });
})

bot.callbackQuery('tbilisiowen', async (ctx) => {

    await ctx.answerCallbackQuery();
    await ctx.reply(texts.tbilisiowen, { parse_mode: 'HTML', disable_web_page_preview: true });
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
    await ctx.replyWithLocation(41.717250, 44.779166);

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
    await ctx.replyWithLocation(41.717250, 44.779166);

    const keyboard = new InlineKeyboard().text('Правила', 'rules');

    await ctx.reply('Ознакомиться с правилами:', {
        reply_markup: keyboard
    });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
});

//Правила
bot.command('rules', async (ctx) => {
    await ctx.reply(texts.rules, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });

});

bot.callbackQuery('rules', async (ctx) => {

    await ctx.answerCallbackQuery();
    await ctx.reply(texts.rules, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply(texts.links.manager, { parse_mode: 'HTML', disable_web_page_preview: true });
})

// ===== РАССЫЛКА =====
bot.command('promo', async (ctx) => {
    await sendBroadcast(ctx, 'usome.txt');
});

// ===== ТЕСТОВАЯ РАССЫЛКА =====
bot.command('test', async (ctx) => {
    await sendBroadcast(ctx, 'test.txt');
});

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

    // Пропускаем команды — они уже обработаны выше
    if (ctx.message.text && ctx.message.text.startsWith('/')) return;

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
        const newContact = [ctx.message.from.id, ctx.message.from.first_name, ctx.message.from.username].join(',');

        // Проверяем, существует ли контакт в файле
        const lines = data.split('\n');
        const id = String(ctx.message.from.id);
        let contactExists = lines.some(line => line.startsWith(id + ',') || line.trim() === id);

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