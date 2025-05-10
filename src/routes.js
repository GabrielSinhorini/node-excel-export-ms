const express = require('express');
const { exportExcel } = require('./controllers/exportController');

const router = express.Router();

router.get('/export/usuarios', exportExcel);

module.exports = router;
