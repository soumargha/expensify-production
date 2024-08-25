const transactionModel = require("../models/TransactionModel");
const moment = require("moment");

const getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;

    const dateFilter =
      frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: moment(selectedDate[0]).toDate(),
              $lte: moment(selectedDate[1]).toDate(),
            },
          };

    const typeFilter = type !== "all" ? { type } : {};

    const transactions = await transactionModel.find({
      ...dateFilter,
      ...typeFilter,
      userid: req.body.userid,
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ message: "Error getting transactions", error });
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edited successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log request body for debugging
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction created");
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findByIdAndDelete(req.body.transactionId);
    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

module.exports = { getAllTransactions, addTransaction, editTransaction, deleteTransaction };
