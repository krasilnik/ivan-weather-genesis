const { Subscription } = require('../models');
const { generateToken } = require('../utils/token');
const { sendConfirmationEmail } = require('../utils/email');

exports.subscribeUser = async (email, city, frequency) => {
    const existing = await Subscription.findOne({ where: { email } });
    if (existing) throw { message: 'Email already subscribed', status: 409};

    const token = generateToken();
    const subscription = await Subscription.create({
        email,
        city,
        frequency,
        token,
    });

    await sendConfirmationEmail(email, token, city);
    return subscription;
};

exports.confirmUser = async (token) => {
    const subscription = await Subscription.findOne({ where: { token } });
    if (!subscription) throw { message: 'Token not found', status: 404 };

    console.log(`✅ Confirming subscription: ${subscription.email}`);

    subscription.confirmed = true;
    await subscription.save();
    const updated = await Subscription.findOne({ where: { token } });
    console.log('🔁 Updated subscription:', updated.dataValues);
};

exports.unsubscribeUser = async (token) => {
  const subscription = await Subscription.findOne({ where: { token } });

  if (!subscription) {
    throw { status: 404, message: 'Token not found' };
  }

  await subscription.destroy();
};