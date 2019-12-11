import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Form,
  Input,
  Modal,
  InputNumber,
  message,
  Upload,
  Button,
  Icon
} from "antd";
import { createProduct, updateProduct } from "../../Store/Action/Product";

const initialData = [
  { name: "ID", value: "" },
  { name: "SKU", value: "" },
  { name: "Name", value: "" },
  { name: "Price", value: "" },
  { name: "Quantity", value: "" }
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
  const [imgList, setImgList] = useState([]);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    const data = _.get(props, "data", false);
    console.log("data: ", data);
    const temp = data
      ? [
          { name: "ID", value: data.id },
          { name: "SKU", value: data.sku },
          { name: "Name", value: data.name },
          { name: "Price", value: data.price },
          { name: "Quantity", value: data.quantity }
        ]
      : initialData;
    setConfigData(temp);
  }, []);
  const handleOk = async () => {
    const _id = _.get(props, "data._id");
    if (!_id && !imgList) {
      message.info("Please upload your image!");
      return;
    }
    setDisabledSubmit(true);
    const data = {
      id: configData[0].value,
      sku: configData[1].value,
      name: configData[2].value,
      price: configData[3].value,
      quantity: configData[4].value,
      image: imgList ? imgList[0] : null
    };
    _id && _.set(data, "_id", _id);
    console.log("data: ", data);
    let res = "";
    console.log('props.action: ', props.action);
    if (props.action === "Update") {
      res = await updateProduct(data);
    } else {
      res = await createProduct(data);
    }
    console.log("res: ", res);
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
  const handleUploadChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setImgList(fileList);
  };
  const uploadProps = {
    beforeUpload: file => {
      setImgList(file);
      return false;
    },
    fileList: imgList,
    listType: "picture-card",
    onChange: handleUploadChange
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
              item.name === "Price" || item.name === "Quantity" ? (
                <InputNumber
                  onChange={value => handleChangeData(value, item)}
                />
              ) : (
                <Input onChange={e => handleChangeData(e.target.value, item)} />
              )
            )}
          </Form.Item>
        ))}
        <Form.Item label="Image">
          {getFieldDecorator("image", {
            rules: [{ required: true, message: "Please input to field!" }]
          })(
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> Upload Image
              </Button>
            </Upload>
          )}
        </Form.Item>
      </Modal>
    </Form>
  );
};
const WrappedInsertForm = Form.create({ name: "InsertForm" })(InsertForm);
export default WrappedInsertForm;
