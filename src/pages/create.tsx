import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Cascader,
  InputNumber,
  Upload
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { addProduct } from 'api/profile';

const onPreview = async file => {
  let src = file.url;
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow.document.write(image.outerHTML);
};



export default function createProduct() {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish = ({ title, content, category, price }) => {
    addProduct(title, content, category, price, fileList)
  }
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
        <ImgCrop rotate>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            name="images"
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Add">
          <Button type="primary" htmlType="submit"> Post</Button>
        </Form.Item>
      </Form>
      <img src="require" alt="" />
    </div>
  )
}
