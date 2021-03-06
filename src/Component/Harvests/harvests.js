import React, { useState, useEffect } from "react";
import { getAllHarvests, deleteHarvests } from "../../Store/Action/Harvests";
import _ from "lodash";
import { Popconfirm, message, Button, Table, Divider } from "antd";
import InsertForm from "./insertForm";
import BgOverlay from "../bgOverlay";

export default function Harvests() {
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState({
    show: false,
    action: "Insert",
  });
  const [curUpdate, setCurUpdate] = useState("");

  const getProductData = async () => {
    const res = await getAllHarvests();
    const data = _.get(res, "data");
    data && setData(data);
  };
  useEffect(() => {
    getProductData();
  }, []);
  const confirmDelete = async item => {
    const res = await deleteHarvests(_.get(item, "_id"));
    const status = _.get(res, "status");
    if (status === 200) {
      getProductData();
      message.info("Harvest deleted!");
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
      title: "HarvestId",
      dataIndex: "harvestId",
      key: "harvestId"
    },

    {
      title: "ProductId",
      dataIndex: "productId",
      key: "productId"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day"
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month"
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year"
    },
    {
      title: "EmployeeId",
      dataIndex: "employeeId",
      key: "employeeId"
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
