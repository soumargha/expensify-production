import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import Layout from "../components/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import {
  AreaChartOutlined,
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setEditable(record);
                setShowModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-2"
              onClick={() => {
                handleDelete(record);
              }}
            />
          </div>
        );
      },
    },
  ];

  const getAllTransactions = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transactions/get-transactions", {
        userid: user._id,
        frequency,
        selectedDate: selectedDate.length
          ? [
              selectedDate[0].startOf("day").toISOString(),
              selectedDate[1].endOf("day").toISOString(),
            ]
          : [],
        type,
      });
      setLoading(false);
      const transactionsWithKeys = res.data.map((transaction) => ({
        ...transaction,
        key: transaction._id, // Adding a key field for each transaction
      }));
      setAllTransactions(transactionsWithKeys);
      console.log("Transactions fetched:", transactionsWithKeys); // Debugging log
    } catch (error) {
      console.log(error);
      message.error("Fetch issue with transaction");
    }
  }, [frequency, selectedDate, type]);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
      getAllTransactions(); // Refresh the transactions list after deleting a transaction
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated successfully");
      } else {
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction added successfully");
      }
      setShowModal(false);
      setEditable(null);
      getAllTransactions(); // Refresh the transactions list after adding a new transaction
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters flex flex-wrap justify-between  p-4 bg-green-100 ">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <h6 className="mb-2 text-sm font-medium text-gray-700">Select Frequency</h6>
          <Select
            value={frequency}
            onChange={(value) => setFrequency(value)}
            className="w-full"
          >
            <Select.Option value={"7"}>Last 1 Week</Select.Option>
            <Select.Option value={"30"}>Last 1 Month</Select.Option>
            <Select.Option value={"365"}>Last 1 Year</Select.Option>
            <Select.Option value={"custom"}>Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
              className="w-full mt-2"
            />
          )}
        </div>

        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <h6 className="mb-2 text-sm font-medium text-gray-700">Select Type</h6>
          <Select
            value={type}
            onChange={(value) => setType(value)}
            className="w-full"
          >
            <Select.Option value={"all"}>ALL</Select.Option>
            <Select.Option value={"income"}>INCOME</Select.Option>
            <Select.Option value={"expense"}>EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="w-full sm:w-auto mb-4 sm:mb-0 flex flex-col items-center justify-center">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">Analytics</h1>
          <div className="flex">
            <UnorderedListOutlined
              className={`mx-2 cursor-pointer ${
                viewData === "table" ? "text-emerald-600" : "text-gray-400"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 cursor-pointer ${
                viewData === "analytics" ? "text-emerald-600" : "text-gray-400"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
        </div>

        <div className="w-full sm:w-auto flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary rounded-full bg-emerald-600 text-white px-4 py-2 mr-4 sm:mr-28 hover:bg-emerald-700"
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content ">
        {viewData === "table" ? (
          <Table
            columns={columns}
            dataSource={allTransactions}
            scroll={{ x: true }}
            className="bg-white shadow-md rounded my-6"
          />
        ) : (
          <Analytics allTransactions={allTransactions} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        className="modal-width" // Custom CSS class for modal width
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary bg-emerald-600 text-white rounded px-4 py-2"
            >
              {editable ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
