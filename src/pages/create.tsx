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
import { categoryOptions } from 'utils/categoryOptions';

const onPreview = async (file: any) => {
  let src = file.url;
  if (!src) {
    src = await new Promise(resolve => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow: Window | null = window.open(src);
  imgWindow && imgWindow.document.write(image.outerHTML);
};

<<<<<<< HEAD
interface OnFinish {
  title: string;
  content: string;
  category: string[];
  price: number;
}

=======
>>>>>>> 725fb23522812f6df5de179097b490c1fa62bc47
export default function createProduct() {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }: { fileList: any }) => {
    setFileList(newFileList);
  };
  const onFinish = ({ title, content, category, price }: OnFinish) => {
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
            options={categoryOptions}
          />
        </Form.Item>
        <Form.Item label="Upload">
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
        </Form.Item>
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
