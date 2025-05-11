const ExcelJS = require('exceljs');
const pool = require('../database/connection');

async function exportDataToExcel() {
  const [rows] = await pool.query('SELECT amount, transaction_type, description, transaction_date, status FROM transactions');

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Usuários');

  sheet.columns = [
    { header: 'Data',              key: 'transaction_date',        width: 10 },
    { header: 'Descrição',         key: 'description',      width: 30 },
    { header: 'Valor',             key: 'amount',     width: 30 },
    { header: 'Tipo da Transação', key: 'transaction_type', width: 20 },
    { header: 'Status',            key: 'status', width: 20 },
  ];

  rows.forEach(row => sheet.addRow(row));

  sheet.getColumn('transaction_date').numFmt = 'dd/mm/yyyy hh:mm';

  return workbook;
}

module.exports = { exportDataToExcel };
