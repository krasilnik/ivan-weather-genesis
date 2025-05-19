const cron = require('node-cron');
const { Subscription } = require('../models');
const { getWeatherByCity} = require('../services/weather.service');
const { sendWeatherEmail } = require('../utils/email');

// Щогодини (щохвилини тест)
cron.schedule('* * * * *', async () => {
    console.log('Hourly weather job...');
    await processWeatherEmails('hourly');
});

//Щодня о 9 ранку
cron.schedule('0 9 * * *', async () => {
    console.log('Daily weather job...');
    await processWeatherEmails('daily');
});

const processWeatherEmails = async (frequency) => {
    const subscriptions = await Subscription.findAll({
        where: { confirmed: true, frequency},
    });

    console.log(`📩 Found ${subscriptions.length} "${frequency}" subscriptions`);

    for (const sub of subscriptions) {
        try {
            const weather = await getWeatherByCity(sub.city);
            await sendWeatherEmail(sub.email, sub.city, weather, sub.token);
            console.log(`✅ Sent to ${sub.email}`);
        } catch (err) {
            console.error(`Error sending to ${sub.email}: ${err.message}`);
        }
    }
};
