require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, InputFile} = require('grammy');

const bot = new Bot (process.env.KEY);

//СОЗДАЛИ МЕНЮ С КОМАНДАМИ В БОТЕ
bot.api.setMyCommands([
    {command: 'start', description: 'Посмотреть контакты'},
    {command: 'wb', description: 'Доставка WB'},
    {command: 'ozon', description: 'Доставка OZON'},
    {command: 'im', description: 'Другие Интернет Магазины'},
    {command: 'owen', description: 'Доставка личных вещей'},
    {command: 'com', description: 'Коммерческие грузы'},
    {command: 'europa', description: 'Доставка в Европу'}
]);

bot.command('start', async (ctx) => {
    console.log(ctx.message);
    const startKeyboard = new Keyboard().text("Доставка WB").text("Доставка OZON").row().text("Другие Интернет Магазины").text("Личные вещи").row().text("Коммерческие грузы").text("Доставка в Европу").row().text("Написать оператору")//.resized();

    await ctx.replyWithPhoto(new InputFile('logo.png'));
    await ctx.reply('Привет, я бот BRING, помогу тебе разобраться.\n\nНаш <a href="https://kon-express.ru/">сайт</a>\nНаш <a href="https://www.instagram.com/bring__courier/">Instagram</a>\nНаш менеджер: @bring_g',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('Жми на кнопку:',{
        reply_markup: startKeyboard
    });
});

 //WB and OZON
bot.command('wb', async (ctx) => {
    const wbKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express ').row().text('Эконом 15 gel/kg, 15-17 дней', 'economwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: wbKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.hears('Доставка WB', async (ctx) => {
    const wbKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express').row().text('Эконом 15 gel/kg, 15-17 дней', 'economwb');

    await ctx.reply('Выберите тариф:', {
        reply_markup: wbKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.command('ozon', async (ctx) => {
    const ozKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express').row().text('Эконом 15 gel/kg, 15-17 дней', 'economoz');

    await ctx.reply('Выберите тариф:', {
        reply_markup: ozKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.hears('Доставка OZON', async (ctx) => {
    const ozKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'express').row().text('Эконом 15 gel/kg, 15-17 дней', 'economoz');

    await ctx.reply('Выберите тариф:', {
        reply_markup: ozKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
})

bot.callbackQuery('express', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('<b>Инструкция:</b>\n\nТариф 20 лари за кг. Срок доставки 5-7 дней.\n\n1. Оформить и оплатить заказ на адрес ПВЗ: г. Владикавказ, <b>ул. Вахтангова, 1.</b>\n\n2. ⁠Дождаться поступления заказа на пункт выдачи.\n\n3. ⁠Прислать:\n - QR-код для получения заказа;\n - ⁠город получатель;\n - ⁠перечень товаров.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные заказа ... </a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
})

bot.callbackQuery('economwb', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('<b>Инструкция:</b>\n\nТариф 15 лари за кг. Срок доставки 15-17 дней.\n\n1. Оформить и оплатить заказ на адрес ПВЗ: г. Владикавказ, <b>ул. Тельмана, 37.</b>\n\n2. ⁠Дождаться поступления заказа на пункт выдачи.\n\n3. ⁠Прислать:\n - QR-код для получения заказа;\n - ⁠город получатель;\n - ⁠перечень товаров.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные заказа ... </a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
})

bot.callbackQuery('economoz', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('<b>Инструкция:</b>\n\nТариф 15 лари за кг. Срок доставки 15-17 дней.\n\n1. Оформить и оплатить заказ на адрес ПВЗ: г. Владикавказ, <b>ул. Павлика Морозова, 49.</b>\n\n2. ⁠Дождаться поступления заказа на пункт выдачи.\n\n3. ⁠Прислать:\n - QR-код для получения заказа;\n - ⁠город получатель;\n - ⁠перечень товаров.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные заказа ...</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

//ДРУГИЕ ИНТЕРНЕТ МАГАЗИНЫ
bot.command('im', async (ctx) => {
    const imKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'expressim').row().text('Эконом 15 gel/kg, 15-17 дней', 'economim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: imKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.hears('Другие Интернет Магазины', async (ctx) => {
    const imKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 5-7 дней', 'expressim').row().text('Эконом 15 gel/kg, 15-17 дней', 'economim');

    await ctx.reply('Выберите тариф:', {
        reply_markup: imKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.callbackQuery('expressim', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('<b>Инструкция:</b>\n\nТариф 20 лари за кг. Срок доставки 5-7 дней.\n\n1. Вы можете оформить заказ в любом интернет магазине осуществляющем доставку посредством СДЭК.\nНапример, Золотое яблоко, Авито и другие.\n\n2. Необходимо оформить и оплатить заказ и его доставку в полном объёме.\n\n3. Данные получателя и адрес пункта СДЕК для доставки:\n- Мелконян Владимир;\n- 79194232240\n- пункт СДЭК г. Владикавказ, улица Астана   Кесаева, 11\n\n4. Дождаться поступления заказа на пункт выдачи.\n\n5. Прислать:\n- QR-код для получения заказа;\n- ⁠город получатель;\n- ⁠перечень товаров;\n- указать выбранный тариф.\n\n6. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные заказа ... </a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
})

bot.callbackQuery('economim', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('<b>Инструкция:</b>\n\nТариф 15 лари за кг. Срок доставки 15-17 дней.\n\n1. Вы можете оформить заказ в любом интернет магазине осуществляющем доставку посредством СДЭК.\nНапример, Золотое яблоко, Авито и другие.\n\n2. Необходимо оформить и оплатить заказ и его доставку в полном объёме.\n\n3. Данные получателя и адрес пункта СДЕК для доставки:\n- Калашникова Елена;\n- 79188272702\n- пункт СДЭК, г. Владикавказ, пр-к Коста, 79\n\n4. Дождаться поступления заказа на пункт выдачи.\n\n5. Прислать:\n- QR-код для получения заказа;\n- ⁠город получатель;\n- ⁠перечень товаров;\n- указать выбранный тариф.\n\n6. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные заказа ... </a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

//Личные вещи
bot.command('owen', async (ctx) => {
    const owenKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 10-15 дней', 'expressowen').row().text('Эконом 15 gel/kg, 15-20 дней', 'economowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: owenKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.hears('Личные вещи', async (ctx) => {
    const owenKeyboard = new InlineKeyboard().text('Экспресс 20 gel/kg, 10-15 дней', 'expressowen').row().text('Эконом 15 gel/kg, 15-20 дней', 'economowen');

    await ctx.reply('Выберите тариф:', {
        reply_markup: owenKeyboard
    });
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.callbackQuery('expressowen', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('<b>Инструкция:</b>\n\nТариф личные вещи Экспресс:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии личных вещей осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 20 лари за кг + тариф СДЭК.\n\nПриблизительный тариф можно рассчитать по калькулятору:\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление.\n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем самостоятельно.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные заказа ... </a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
})

bot.callbackQuery('economowen', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('<b>Инструкция:</b>\n\nТариф личные вещи Экспресс:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии личных вещей осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 15 лари за кг + тариф СДЭК. Срок 15-20 дней.\n\nПриблизительный тариф можно рассчитать по калькулятору:\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление.\n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем самостоятельно.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные заказа ... </a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

//Коммерческий тариф
bot.command('europa', async (ctx) => {
    await ctx.reply('<b>Инструкция:</b>\n\nДоставка в Европу.\n\nТариф 8,5 евро за кг. Срок 3-4 недели. Груз страхуется на 30 евро каждое место.\n\nУчитывается объёмный вес, рассчитывается по формуле: длина * высоту * ширину / 5000\n\nДля оформления заказа необходимо предоставить информацию:\n\nSender details:\nFULL NAME: \nTelephone: \nAddress: \nPassport ID: \nDeclared price: \n\nRecipient details:\nFULL NAME: \nTelephone: \nZIP-code: \nRecipient address:',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные по заказу</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.hears('Доставка в Европу', async (ctx) => {
    await ctx.reply('<b>Инструкция:</b>\n\nДоставка в Европу.\n\nТариф 8,5 евро за кг. Срок 3-4 недели. Груз страхуется на 30 евро каждое место.\n\nУчитывается объёмный вес, рассчитывается по формуле: длина * высоту * ширину / 5000\n\nДля оформления заказа необходимо предоставить информацию:\n\nSender details:\n - FULL NAME: \n - Telephone: \n - Address: \n - Passport ID: \n - Declared price: \n\nRecipient details:\n - FULL NAME: \n - Telephone: \n - ZIP-code: \n - Recipient address:',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные по заказу</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );

});

//Коммерческий тариф
bot.command('com', async (ctx) => {
    await ctx.reply('<b>Инструкция:</b>\n\nТариф коммерческий:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии коммерческих грузов осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 15 лари за кг + тариф СДЭК. Срок 15-20 дней.\n\nПриблизительный тариф можно рассчитать по калькулятору:\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление. \n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем автоматически.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные по заказу</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
});

bot.hears('Коммерческие грузы', async (ctx) => {
    await ctx.reply('<b>Инструкция:</b>\n\nТариф коммерческий:\n\nПо данному тарифу доставка в Грузию и отправка из Грузии коммерческих грузов осуществляется по следующим направлениям: Россия, Беларусь, Казахстан, Киргизия, Армения.\n\nТранспортировка груза за пределами Грузии осуществляется компанией СДЭК.\n\nСтоимость доставки 15 лари за кг + тариф СДЭК. Срок 15-20 дней.\n\nПриблизительный тариф можно рассчитать по калькулятору:\n- для корректной работы калькулятора на телефоне необходимо установить Гугл таблицы;\n- для расчёта нужно указать город за пределами Грузии. Стоимость доставки не зависит от направления доставки, в Грузию и из Грузии цена одинаковая.\n- точный тариф рассчитывается у нас в офисе, после взвешивания и обмера груза.\n\nДля оформления заказ:\n\n1. Необходимо отправить менеджеру следующую информацию:\n- город отправления;\n- город назначения;\n- вес отправления;\n- что хотите отправить;\n\n2. При отправке из Грузии менеджер пришлёт инструкцию, как можно сдать отправление. \n\nПри отправке в Грузию менеджер пришлёт накладную СДЭК для передачи отправления в пункт приёма.\n\n3. Отслеживание груза по нашим накладным осуществляем автоматически.\n\n4. После поступления заказа на пункт выдачи Вам будет направлено персональное уведомление.',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );
    await ctx.reply('<a href="https://t.me/bring_g">Отправить данные по заказу</a>',
        {parse_mode: 'HTML', disable_web_page_preview: true}
    );

});


//РЕАКЦИЯ НА ЛЮБОЙ ТЕКСТ СЛОВО
bot.on('message:text', async (ctx) => {
    await ctx.reply('<a href="https://t.me/bring_g">Написать менеджеру ...</a>',
    {parse_mode: 'HTML', disable_web_page_preview: true});
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

bot.start();