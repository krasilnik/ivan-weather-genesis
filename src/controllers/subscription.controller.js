const { subscribeUser, confirmUser, unsubscribeUser } = require('../services/subscription.service');

exports.subscribe = async (req, res) => {
  const { email, city, frequency } = req.body;

  try {
    await subscribeUser(email, city, frequency);
    res.status(200).json({ message: 'Subscription successful. Confirmation email sent.' });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.confirmSubscription = async (req, res) => {
  try {
    await confirmUser(req.params.token);
    res.status(200).json({ message: 'Subscription confirmed successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    await unsubscribeUser(token);
    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
  }
};
