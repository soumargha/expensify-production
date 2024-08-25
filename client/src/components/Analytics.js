import { Progress } from "antd";
import React from "react";



const Analytics = ({ allTransactions }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  const totalTransaction = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  const totalTurnOver = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnOver = totalIncomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalExpenseTurnOver = totalExpenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

 

  const totalIncomeTurnOverPercent =
    (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenseTurnOverPercent =
    (totalExpenseTurnOver / totalTurnOver) * 100;

  const recentTransactions = allTransactions.slice(-5).reverse();

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
  
    // Check if the date is invalid
    if (isNaN(dateTime.getTime())) {
      return "Invalid Date";
    }
  
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  

  return (
    <div className="bg: bg-gray-100"> {/* Apply the CSS class here */}
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-emerald-300">
              Total Transactions: {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense: {totalExpenseTransactions.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"#52c41a"} // Green
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"#f5222d"} // Red
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-emerald-300">Total TurnOver: {totalTurnOver}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnOver}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnOver}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"#52c41a"} // Green
                  className="mx-2"
                  percent={totalIncomeTurnOverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"#f5222d"} // Red
                  className="mx-2"
                  percent={totalExpenseTurnOverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        

        <div className="row mt-3">
          <div className="col-md-4">
            <h4 className="card-header bg-emerald-300">Categorywise Income</h4>
            {categories.map((category) => {
              const amount = allTransactions
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card" key={category}>
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress
                        percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="col-md-4">
            <h4 className="card-header bg-emerald-300">Categorywise Expense</h4>
            {categories.map((category) => {
              const amount = allTransactions
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card" key={category}>
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress
                        percent={((amount / totalExpenseTurnOver) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="col-md-4">
            <div className="card mt-[-15.6rem]">
              <div className="card-header bg-emerald-300">Recent Transactions</div>
              <div className="card-body">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="transaction-item">
                    <h5 className={transaction.type === "income" ? "text-success" : "text-danger"}>
                      {transaction.type.toUpperCase()} - ${transaction.amount}
                    </h5>
                    <p>{transaction.category}</p>
                    <p>{formatDateTime(transaction.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Analytics;
