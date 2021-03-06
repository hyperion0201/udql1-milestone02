import React, { useState, useEffect } from "react";
import { getAllEmployees, deleteEmployees } from "../../Store/Action/Employees";
import _ from "lodash";
import { Popconfirm, message, Button, Table, Divider } from "antd";
import InsertForm from "./insertForm";
import BgOverlay from "../bgOverlay";

export default function Employees() {
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState({
    show: false,
    action: "Insert",
  });
  const [curUpdate, setCurUpdate] = useState("");

  const getProductData = async () => {
    const res = await getAllEmployees();
    const data = _.get(res, "data");
    data && setData(data);
  };
  useEffect(() => {
    getProductData();
  }, []);
  const confirmDelete = async item => {
    const res = await deleteEmployees(_.get(item, "_id"));
    const status = _.get(res, "status");
    if (status === 200) {
      getProductData();
      message.info("Employees deleted!");
    } else {
      message.info("Action fail!");
    }
  };
  const showInsertPopup = () => {
    setCurUpdate("");
    setShowPopup({show: true, action: "Insert"});
  };
  const handleUpdate = item => {
    setCurUpdate(item);
    setShowPopup({show: true, action: "Update"});
  };

  const columns = [
    {
      title: "EmployeeId",
      dataIndex: "employeeId",
      key: "employeeId"
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Type",
      dataIndex: "employeeType",
      key: "employeeType"
    },
    {
      title: "Action",
      key: "action",
      render: item => (
        <span>
          <span className="action-hover" onClick={() => handleUpdate(item)}>
            Update
          </span>
          <Divider type="vertical" />
          <Popconfirm
            placement="top"
            title="Are you sure to delete this product?"
            onConfirm={() => confirmDelete(item)}
            okText="Yes"
            cancelText="No"
          >
            <span className="action-hover">Delete</span>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <>
      {showPopup.show && (
        <>
          <BgOverlay activeClass={showPopup.show} />
          <InsertForm
            data={curUpdate}
            acceptCancel={(status) => {
              setShowPopup({show: false});
              status && getProductData();
            }}
            action={showPopup.action}
          />
        </>
      )}
      <div className="product-table">
        <Button
          onClick={() => showInsertPopup()}
          style={{
            background: "#fa8c16",
            border: "#fa8c16",
            marginBottom: "5px"
          }}
          type="primary"
        >
          Insert
        </Button>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
}
