import React from 'react'
import {
  Form,
  Input,
  Button,
  Cascader,
  InputNumber,
} from 'antd';
import { addProduct } from 'api/profile';

const onFinish = ({ title, content, category, price }) => {
  addProduct(title, content, category, price)
}

export default function createProduct() {
  return (
    <div>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item label="Input" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="content">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Categories" name="category">
          <Cascader
            options={[
              {
                value: 'Man',
                label: 'man',
                children: [
                  {
                    value: 'top',
                    label: 'Top',
                  },
                ],
              },
              {
                value: 'women',
                label: 'women',
                children: [
                  {
                    value: 'top',
                    label: 'Top',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Add">
          <Button type="primary" htmlType="submit"> Post</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
