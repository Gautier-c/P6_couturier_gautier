const express = require('express');
const router = express.Router();

const likesCtrl = require('../controllers/reactions');

router.post('/:id/like', likesCtrl.likeSauce);
router.post('/dislike', likesCtrl.dislikeSauce);

module.exports = router;