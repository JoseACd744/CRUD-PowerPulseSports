const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/RatingController');

router.post('/users/:userId/products/:productId/ratings', RatingController.createRatingForProductByUser);
router.get('/users/:userId/products/:productId/ratings', RatingController.readRatingsForProductByUser);
router.put('/users/:userId/products/:productId/ratings/:id', RatingController.updateRatingForProductByUser);
router.delete('/users/:userId/products/:productId/ratings/:id', RatingController.deleteRatingForProductByUser);

module.exports = router;