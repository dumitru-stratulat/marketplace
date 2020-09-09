/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

type Status = "pending" | "success" | "error";
