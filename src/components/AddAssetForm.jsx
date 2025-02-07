import { useRef, useState } from "react";
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";


const validateMessage = {
  required: "${label} is required!",
  types: {
    number: "${label} is not valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({onClose}) {
  const [coin, setCoin] = useState(null);
  const { crypto, addAsset } = useCrypto();
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef()

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`You have successfully added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        onSelect={(v) => setCoin(crypto.find((coin) => coin.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              src={option.data.icon}
              alt={option.data.label}
              style={{ width: 25 }}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  const onFinish = (values) => {
    const newAsset = {        
        id: coin.id,
        amount: values.amount,
        price: values.price,
        date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    console.log("Success:", values);
    addAsset(newAsset)
    setSubmitted(true)
  };

  function HandleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: price * value,
    });
  }

  function HandlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: value * amount,
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(3),
      }}
      onFinish={onFinish}
      validateMessages={validateMessage}
    >
      <CoinInfo coin={coin}/>

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={HandleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={HandlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Date & Time"
        name="date"
        rules={[
          {
            required: true,
            type: "date",
            message: "Please select date!",
          },
        ]}
      >
        <DatePicker
          showTime
          format={{
            format: "YYYY-MM-DD HH:mm",
            type: "mask",
          }}
        />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
