import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Form, Input, Modal, InputNumber, message } from "antd";
import { createInvoice, updateInvoice } from "../../Store/Action/Invoice";

const initialData = [
  { name: "ID", value: "" },
  { name: "Customer Name", value: "" },
  { name: "Customer Phone", value: "" },
  { name: "Total Price", value: "" },
  { name: "Order Date", value: "" }
];
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const InsertForm = props => {
  const [configData, setConfigData] = useState(initialData);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    const data = _.get(props, "data", false);
    const temp = data
      ? [
          { name: "ID", value: data.invoicesId },
          { name: "Customer Name", value: data.customerName },
          { name: "Customer Phone", value: data.customerPhoneNumber },
          { name: "Total Price", value: data.totalPrice },
          { name: "Order Date", value: data.orderDate }
        ]
      : initialData;
    setConfigData(temp);
  }, []);
  const handleOk = async () => {
    const _id = _.get(props, "data._id");
    setDisabledSubmit(true);
    const data = {
      invoicesId: configData[0].value,
      customerName: configData[1].value,
      customerPhoneNumber: configData[2].value,
      totalPrice: configData[3].value,
      orderDate: configData[4].value
    };
    _id && _.set(data, "_id", _id);
    let res = "";
    if (props.action === "Update") {
      res = await updateInvoice(data);
    } else {
      res = await createInvoice(data);
    }
    const status = _.get(res, "status");
    if (status === 200) {
      message.info("Action successed!");
      props.acceptCancel(status);
    } else {
      message.info("Action fail!");
      setDisabledSubmit(false);
    }
  };
  const handleCancel = () => {
    props.acceptCancel();
  };
  const handleChangeData = (value, item) => {
    let array = configData;
    const index = _.findIndex(array, { name: item.name });
    array[index].value = value;
    setConfigData(array);
  };
  return (
    <Form
      {...formItemLayout}
      action="/products"
      method="post"
      encType="multipart/form-data"
    >
      <Modal
        title={`${props.action} Product`}
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: disabledSubmit }}
      >
        {_.map(configData, (item, index) => (
          <Form.Item key={index} label={item.name}>
            {getFieldDecorator(item.name, {
              initialValue: item.value,
              rules: [{ required: true, message: "Please input to field!" }]
            })(
              item.name === "Total Price" ||
                item.name === "Customer Phone" ? (
                <InputNumber
                  onChange={value => handleChangeData(value, item)}
                />
              ) : (
                <Input onChange={e => handleChangeData(e.target.value, item)} />
              )
            )}
          </Form.Item>
        ))}
      </Modal>
    </Form>
  );
};
const WrappedInsertForm = Form.create({ name: "InsertForm" })(InsertForm);
export default WrappedInsertForm;
