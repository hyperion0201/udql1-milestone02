import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Form, Input, Modal, InputNumber, message } from "antd";
import { createHarvests, updateHarvests } from "../../Store/Action/Harvests";

const initialData = [
  { name: "HarvestId", value: "" },
  { name: "ProductId", value: "" },
  { name: "Quantity", value: "" },
  { name: "Day", value: "" },
  { name: "Month", value: "" },
  { name: "Year", value: "" },
  { name: "EmployeeId", value: "" }
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
          { name: "HarvestId", value: data.harvestId },
          { name: "ProductId", value: data.productId },
          { name: "Quantity", value: data.quantity },
          { name: "Day", value: data.day },
          { name: "Month", value: data.month },
          { name: "Year", value: data.year },
          { name: "EmployeeId", value: data.employeeId }
        ]
      : initialData;
    setConfigData(temp);
  }, []);
  const handleOk = async () => {
    const _id = _.get(props, "data._id");
    setDisabledSubmit(true);
    const data = {
      harvestId: configData[0].value,
      productId: configData[1].value,
      quantity: configData[2].value,
      day: configData[3].value,
      month: configData[4].value,
      year: configData[5].value,
      employeeId: configData[6].value,
    };
    _id && _.set(data, "_id", _id);
    let res = "";
    if (props.action === "Update") {
      res = await updateHarvests(data);
    } else {
      res = await createHarvests(data);
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
              item.name === "HarvestId" ||
                item.name === "ProductId" ||
                item.name === "EmployeeId" ? (
                <Input onChange={e => handleChangeData(e.target.value, item)} />
              ) : (
                <InputNumber
                  onChange={value => handleChangeData(value, item)}
                />
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
