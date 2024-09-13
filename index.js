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
    { command: 'com', description: 'Коммерческие грузы' },
    { command: 'europa', description: 'Доставка в Европу' },
    { command: 'doc', description: 'Документы' },
    { command: 'contacts', description: 'Контактные данные' },
]);

bot.command('start', async (ctx) => {
    console.log(ctx.message);
    const startKeyboard = new Keyboard()
        .text("Доставка WB").text("Доставка OZON")
        .row().text("Другие Интернет Магазины").text("Личные вещи")
        .row().text("Коммерческие грузы").text("Доставка в Европу")
        .row().text('Документы').text("Наши данные и офисы")//.resized();

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

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express ').row().text('Эконом 15 gel/kg, 15-17 дней', 'economwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Доставка WB', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express').row().text('Эконом 15 gel/kg, 15-17 дней', 'economwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.command('ozon', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express').row().text('Эконом 15 gel/kg, 15-17 дней', 'economoz');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Доставка OZON', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express').row().text('Эконом 15 gel/kg, 15-17 дней', 'economoz');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
})

bot.callbackQuery('express', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф 20 лари за кг. Срок доставки 5-7 дней.\n\n1. Оформить и оплатить заказ на адрес ПВЗ: г. Владикавказ, <b>ул. Вахтангова, 1.</b>\n\n2. ⁠Дождаться поступления заказа на пункт выдачи.\n\n3. ⁠Прислать:\n - QR-код для получения заказа;\n - ⁠город получатель;\n - ⁠перечень товаров.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление';
    await ctx.answerCallbackQuery();

    await ctx.reply(text,
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
    await ctx.reply('<a href="https://t.me/BRING_registration_order_bot">Отправить данные заказа ... </a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
})

bot.callbackQuery('economwb', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф 15 лари за кг. Срок доставки 15-17 дней.\n\n1. Оформить и оплатить заказ на адрес ПВЗ: г. Владикавказ, <b>ул. Тельмана, 37.</b>\n\n2. ⁠Дождаться поступления заказа на пункт выдачи.\n\n3. ⁠Прислать:\n - QR-код для получения заказа;\n - ⁠город получатель;\n - ⁠перечень товаров.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление';
    await ctx.answerCallbackQuery();

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_order_bot">Отправить данные заказа ... </a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
})

bot.callbackQuery('economoz', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф 15 лари за кг. Срок доставки 15-17 дней.\n\n1. Оформить и оплатить заказ на адрес ПВЗ: г. Владикавказ, <b>ул. Павлика Морозова, 49.</b>\n\n2. ⁠Дождаться поступления заказа на пункт выдачи.\n\n3. ⁠Прислать:\n - QR-код для получения заказа;\n - ⁠город получатель;\n - ⁠перечень товаров.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление';
    await ctx.answerCallbackQuery();

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_order_bot">Отправить данные заказа ...</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

//ДРУГИЕ ИНТЕРНЕТ МАГАЗИНЫ
bot.command('im', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'expressim').row().text('Эконом 15 gel/kg, 15-17 дней', 'economim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Другие Интернет Магазины', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'expressim').row().text('Эконом 15 gel/kg, 15-17 дней', 'economim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.callbackQuery('expressim', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф 20 лари за кг. Срок доставки 5-7 дней.\n\n1. Вы можете оформить заказ в любом интернет магазине осуществляющем доставку посредством СДЭК.\nНапример, Золотое яблоко, Авито и другие.\n\n2. Необходимо оформить и оплатить заказ и его доставку в полном объёме.\n\n3. Данные получателя и адрес пункта СДЕК для доставки:\n- Мелконян Владимир;\n- 79194232240\n- пункт СДЭК г. Владикавказ, улица Астана   Кесаева, 11\n\n4. Дождаться поступления заказа на пункт выдачи.\n\n5. Прислать:\n- код для получения заказа;\n- ⁠город получатель;\n- ⁠перечень товаров;\n- указать выбранный тариф.\n\n6. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.';
    await ctx.answerCallbackQuery();

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_order_bot">Отправить данные заказа ... </a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
})

bot.callbackQuery('economim', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф 15 лари за кг. Срок доставки 15-17 дней.\n\n1. Вы можете оформить заказ в любом интернет магазине осуществляющем доставку посредством СДЭК.\nНапример, Золотое яблоко, Авито и другие.\n\n2. Необходимо оформить и оплатить заказ и его доставку в полном объёме.\n\n3. Данные получателя и адрес пункта СДЕК для доставки:\n- Калашникова Елена;\n- 79188272702\n- пункт СДЭК, г. Владикавказ, пр-к Коста, 79\n\n4. Дождаться поступления заказа на пункт выдачи.\n\n5. Прислать:\n- QR-код для получения заказа;\n- ⁠город получатель;\n- ⁠перечень товаров;\n- указать выбранный тариф.\n\n6. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.';
    await ctx.answerCallbackQuery();

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_order_bot">Отправить данные заказа ... </a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

//Личные вещи
bot.command('owen', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 10-15 дней', 'expressowen').row().text('Эконом 15 gel/kg, 15-20 дней', 'economowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Личные вещи', async (ctx) => {

    const keyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 10-15 дней', 'expressowen').row().text('Эконом 15 gel/kg, 15-20 дней', 'economowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: keyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.callbackQuery('expressowen', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф личные вещи Экспресс:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии личных вещей осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 20 лари за кг + тариф СДЭК.\n\nПриблизительный тариф можно рассчитать по <a href="https://docs.google.com/spreadsheets/d/1EA-VjLEw5e3Z3mT10wK5eUhSl7KGFvMMf3Zea0g1NH0/edit?gid=2144122033#gid=2144122033">калькулятору:</a>\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление.\n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем автоматически.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.';

    await ctx.answerCallbackQuery();
    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_delivery_bot">Отправить данные заказа ... </a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
})

bot.callbackQuery('economowen', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф личные вещи Экспресс:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии личных вещей осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 15 лари за кг + тариф СДЭК. Срок 15-20 дней.\n\nПриблизительный тариф можно рассчитать по <a href="https://docs.google.com/spreadsheets/d/1KE8gpXrBf3of4TfOtazEz3T8hVN2W68wc0vZVo7mNE8/edit?gid=1348888179#gid=1348888179">калькулятору:</a>\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление.\n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем автоматически.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.';

    await ctx.answerCallbackQuery();
    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_delivery_bot">Отправить данные заказа ... </a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

//Доставкав в Европу
bot.command('europa', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nДоставка в Европу.\n\nТариф 8,5 евро за кг. Срок 3-4 недели. Груз страхуется на 30 евро каждое место.\n\nУчитывается объёмный вес, рассчитывается по формуле: длина * высоту * ширину / 5000\n\nДля оформления заказа необходимо предоставить информацию:\n\nSender details:\nFULL NAME: \nTelephone: \nAddress: \nPassport ID: \nDeclared price: \n\nRecipient details:\nFULL NAME: \nTelephone: \nZIP-code: \nRecipient address:';

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_europa_bot">Отправить данные по заказу</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Доставка в Европу', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nДоставка в Европу.\n\nТариф 8,5 евро за кг. Срок 3-4 недели. Груз страхуется на 30 евро каждое место.\n\nУчитывается объёмный вес, рассчитывается по формуле: длина * высоту * ширину / 5000\n\nДля оформления заказа необходимо предоставить информацию:\n\nSender details:\n - FULL NAME: \n - Telephone: \n - Address: \n - Passport ID: \n - Declared price: \n\nRecipient details:\n - FULL NAME: \n - Telephone: \n - ZIP-code: \n - Recipient address:';

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_europa_bot">Отправить данные по заказу</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );

});

//Коммерческий тариф
bot.command('com', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф коммерческий:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии коммерческих грузов осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 15 лари за кг + тариф СДЭК. Срок 15-20 дней.\n\nПриблизительный тариф можно рассчитать по <a href="https://docs.google.com/spreadsheets/d/1KE8gpXrBf3of4TfOtazEz3T8hVN2W68wc0vZVo7mNE8/edit?gid=1348888179#gid=1348888179">калькулятору:</a>\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление. \n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем автоматически.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.';

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_delivery_bot">Отправить данные по заказу</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Коммерческие грузы', async (ctx) => {

    const text = '<b>Инструкция:</b>\n\nТариф коммерческий:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии коммерческих грузов осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 15 лари за кг + тариф СДЭК. Срок 15-20 дней.\n\nПриблизительный тариф можно рассчитать по <a href="https://docs.google.com/spreadsheets/d/1KE8gpXrBf3of4TfOtazEz3T8hVN2W68wc0vZVo7mNE8/edit?gid=1348888179#gid=1348888179">калькулятору:</a>\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление. \n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем автоматически.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.';

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_delivery_bot">Отправить данные по заказу</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

//документы
bot.command('doc', async (ctx) => {

    const text = 'В Документы текст: Тариф 70 лари за каждый кг. Любой вес округляется до полного кг в большую сторону.';

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_delivery_bot">Отправить данные по заказу</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Документы', async (ctx) => {

    const text = 'В Документы текст: Тариф 70 лари за каждый кг. Любой вес округляется до полного кг в большую сторону.';

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/BRING_registration_delivery_bot">Отправить данные по заказу</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

//контакты
bot.command('contacts', async (ctx) => {

    const text = 'Батуми канделаки 2';

    await ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

bot.hears('Наши данные и офисы', async (ctx) => {

    await ctx.reply('Батуми, ул. Баку, 10', { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.646271, 41.646445);

    await ctx.reply('Батуми, ул. Шерифа Химшиашвили, 47а', { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.631546, 41.603927);

    await ctx.reply('Тбилиси, ул. Мераба Костава, 75 (метро Тех. Университет)', { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.721569, 44.7779537);

    await ctx.reply('Dighomi Massive III Quarter, Building 7', { parse_mode: 'HTML', disable_web_page_preview: true });
    await ctx.replyWithLocation(41.756766, 44.778825);


    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        { parse_mode: 'HTML', disable_web_page_preview: true }
    );
});

//удаление соообщений человека из списка
const blockedUsers = [5285246029];

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