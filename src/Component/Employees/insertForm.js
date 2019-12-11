import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Form, Input, Modal, InputNumber, message } from "antd";
import { createEmployees, updateEmployees } from "../../Store/Action/Employees";

const initialData = [
  { name: "EmployeeId", value: "" },
  { name: "Name", value: "" },
  { name: "Phone", value: 0 },
  { name: "Type", value: "" }
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
          { name: "EmployeeId", value: data.employeeId },
          { name: "Name", value: data.name },
          { name: "Phone", value: data.phone },
          { name: "Type", value: data.employeeType }
        ]
      : initialData;
    setConfigData(temp);
  }, []);
  const handleOk = async () => {
    const _id = _.get(props, "data._id");
    setDisabledSubmit(true);
    const data = {
      employeeId: configData[0].value,
      name: configData[1].value,
      phone: configData[2].value,
      employeeType: configData[3].value
    };
    _id && _.set(data, "_id", _id);
    let res = "";
    if (props.action === "Update") {
      res = await updateEmployees(data);
    } else {
      res = await createEmployees(data);
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
              <Input onChange={e => handleChangeData(e.target.value, item)} />
            )}
          </Form.Item>
        ))}
      </Modal>
    </Form>
  );
};
const WrappedInsertForm = Form.create({ name: "InsertForm" })(InsertForm);
export default WrappedInsertForm;
