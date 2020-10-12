import React, { useState, useContext } from 'react'
import {
  Form,
  Input,
  Button,
  Cascader,
  InputNumber,
  Upload,
  Row,
  Col
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { addProduct } from 'api/profile';
import { categoryOptions } from 'utils/categoryOptions';
import { AppContext, ContextProps } from 'context/AppContext'
import { Context } from 'vm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import FooterLayout from 'components/FooterLayout/FooterLayout';
import { sizeOptions } from 'utils/sizeOptions';
import { conditionOptions } from 'utils/conditionOptions';
import Router from 'next/router';



interface OnFinish {
  title: string;
  content: string;
  category: string[];
  price: number;
  condition: string[];
  size: string[];
  contactNumber: number;
}

export default function createProduct() {
  const [fileList, setFileList] = useState([]);
  const ctx: ContextProps | null = useContext(AppContext);
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const onPreview = async (file) => {
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
    const imgWindow: Window | null = window.open(src);
    imgWindow && imgWindow.document.write(image.outerHTML);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish = async ({ title, content, category, price, condition, size, contactNumber }: OnFinish) => {
    category = [category[0], category[2]];
    await addProduct(title, content, category, price, fileList, ctx.userDetails.username, condition[0], size[1], contactNumber);
    await Router.push(`/profile/${ctx.userDetails.userId}`);

  }
  return (
    <div>
      <HeaderLayout />
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
        <Form.Item
          label="Titlu"
          name="title"
          rules={[
            {
              required: true,
              message: 'Titlul este obligatoriu',
            },
            {
              max: 100,
              message: 'Titlul este prea lung'
            },
            {
              min: 5,
              message: 'Titlul este prea scurt'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Descriptie:"
          name="content"
          rules={[
            {
              required: true,
              message: 'Descripția este obligatorie',
            },
            {
              max: 500,
              message: 'Descriptia este prea lunga'
            },
            {
              min: 5,
              message: 'Descripția este prea scurta'
            }
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Categorie:"
          name="category"
          rules={[
            {
              required: true,
              message: 'Categoria este obligatorie',
            }]}
        >
          <Cascader
            options={categoryOptions}
            expandTrigger="hover"
          />
        </Form.Item>
        <Form.Item
          label="Încarcă"
          rules={[
            {
              required: true,
              message: 'Încarcă imaginea',
            }]}
        >
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              // onPreview={onPreview}
              name="images"
            >
              {fileList.length < 5 && '+ Încarcă'}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          label="Condiție"
          name="condition"
          rules={[
            {
              required: true,
              message: 'Seteaza conditia articolului',
            }]}
        >
          <Cascader
            options={conditionOptions}
            expandTrigger="hover"
          />
        </Form.Item>
        <Form.Item
          label="Marime"
          name="size"
          rules={[
            {
              required: true,
              message: 'Seteaza marimea',
            }]}
        >
          <Cascader
            options={sizeOptions}
            expandTrigger="hover"
          />
        </Form.Item>
        <Form.Item
          label="Numar de contact:"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: 'Introdu numar de telefon',
            },
            {
              min: 4,
              message: 'Introduceți număr de telefon valid'
            },
            {
              max: 12,
              message: 'Introduceți număr de telefon valid'
            }
          ]}
        >
          <Input
            type="number"
          />
        </Form.Item>
        <Form.Item
          label="Preț (lei):"
          name="price"
          rules={[
            {
              required: true,
              message: 'Introduceți numarul',
            }]}
        >
          <InputNumber
            min={0}
            type="number"
          />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit"> Postează</Button>
        </Form.Item>
      </Form>
      <FooterLayout />
    </div>
  )
}
