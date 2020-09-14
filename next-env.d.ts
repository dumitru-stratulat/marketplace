/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

type StatusState = {
  status: "idle" | "pending" | "success" | "error";
  message?: unknown;
};

type ProductData = {
  title: title;
  price: number;
  content: content;
  imagesUrl: [unknown];
};
