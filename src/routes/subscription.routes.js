const express = require('express');
const router = express.Router();
const {
    subscribe,
    confirmSubscription,
    unsubscribe,
} = require('../controllers/subscription.controller');

router.post('/subscribe', subscribe);
router.get('/confirm/:token', confirmSubscription);
router.get('/unsubscribe/:token', unsubscribe);

module.exports = router;