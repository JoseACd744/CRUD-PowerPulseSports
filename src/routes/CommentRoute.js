const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

router.post('/users/:userId/products/:productId/comments', CommentController.createCommentForProductByUser);
router.get('/users/:userId/products/:productId/comments', CommentController.readCommentsForProductByUser);
router.put('/users/:userId/products/:productId/comments/:id', CommentController.updateCommentForProductByUser);
router.delete('/users/:userId/products/:productId/comments/:id', CommentController.deleteCommentForProductByUser);

module.exports = router;