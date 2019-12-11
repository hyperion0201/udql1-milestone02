import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Form, Input, Modal, InputNumber, message } from "antd";
import { createProduct, updateProduct } from "../../Store/Action/Product";

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
  const [configData, setConfigData] = useState([
    { name: "ID", value: "" },
    { name: "SKU", value: "" },
    { name: "Name", value: "" },
    { name: "Price", value: 0 },
    { name: "Quantity", value: 0 }
  ]);
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    const data = _.get(props, "data", false);
    console.log('data: ', data);
    const temp = data && [
      { name: "ID", value: data.id },
      { name: "SKU", value: data.sku },
      { name: "Name", value: data.name },
      { name: "Price", value: data.price },
      { name: "Quantity", value: data.quantity }
    ];
    props.action === "Update" && setConfigData(temp);
  }, [props.data]);
  const handleOk = async (e) => {
    let res = "";
    if(props.action === "Update") {
      res = await updateProduct(configData);
    } else {
      res = await createProduct(configData);
    }
    const status = _.get(res, "status");
    if(status === 200) {
      message.info("Action successed!");
      props.acceptCancel();
    }
    else message.info("Action fail!");
  };
  const handleCancel = () => {
    props.acceptCancel();
  };
  const handleChangeData = (e, item) => {
    item.value = _.get(e, "target.value", item.value);
    let array = configData;
    _.map(array, i => {
      return i.name === item.name ? item : i;
    })
    setConfigData(array);
  };

  return (
    <Form
      {...formItemLayout}
      action="/products"
      method="post"
      enctype="multipart/form-data"
    >
      <Modal
        title={`${props.action} Product`}
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {_.map(configData, (item, index) => (
          <Form.Item key={index} label={item.name}>
            {getFieldDecorator(item.name, {
              initialValue: item.value,
              rules: [{ required: true, message: "Please input to field!" }]
            })(
              item.name === "Price" || item.name === "Quantity" ? (
                <InputNumber
                  onChange={e => handleChangeData(e, item)}
                />
              ) : (
                <Input
                  onChange={e => handleChangeData(e, item)}
                />
              )
            )}
          </Form.Item>
        ))}
        <Form.Item label="Image">
          {getFieldDecorator("image", {
            rules: [{ required: true, message: "Please input to field!" }]
          })(<input type="file" accept="image/*" value="Upload Image"></input>)}
        </Form.Item>
      </Modal>
    </Form>
  );
};
const WrappedInsertForm = Form.create({ name: "InsertForm" })(InsertForm);
export default WrappedInsertForm;
