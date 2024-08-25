const express = require('express');
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/TransactionCtrl');

// router object
const router = express.Router();

// routes
// add transaction route
router.post('/add-transaction', addTransaction);

// edit transaction
router.post('/edit-transaction', editTransaction);

// delete transaction
router.post('/delete-transaction', deleteTransaction);

// get transactions route
router.post('/get-transactions', getAllTransactions);

module.exports = router;
