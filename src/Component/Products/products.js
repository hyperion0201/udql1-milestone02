import React, { useState, useEffect } from "react";
import baseUrl from "../../Configs";
import { getAllProduct, deleteProduct } from "../../Store/Action/Product";
import _ from "lodash";
import { Popconfirm, message, Button, Icon, Table, Divider } from "antd";
import InsertForm from "./insertForm";
import BgOverlay from "../bgOverlay";

export default function Products() {
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [curUpdate, setCurUpdate] = useState("");

  const getProductData = async () => {
    const res = await getAllProduct();
    const data = _.get(res, "data");
    data && setData(data);
  };
  useEffect(() => {
    getProductData();
  }, []);
  const confirmDelete = async item => {
    const res = await deleteProduct(_.get(item, "_id"));
    const status = _.get(res, "status");
    if (status === 200) {
      getProductData();
      message.info("Product deleted!");
    } else {
      message.info("Action fail!");
    }
  };
  const showInsertPopup = () => {
    setShowPopup(true);
  };
  const handleUpdate = item => {
    setCurUpdate(item);
    setShowPopup(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },

    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku"
    },
    {
      title: "Image",
      dataIndex: "sku",
      key: "image",
      render: item => {
        return (
          <img
            className="product-img"
            src={`${baseUrl}/assets/${item}.jpg`}
            alt={item.name}
          ></img>
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
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
      {showPopup && (
        <>
          <BgOverlay activeClass={showPopup} />
          <InsertForm
            data={curUpdate}
            acceptCancel={() => setShowPopup(false)}
            action={"Update"}
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
