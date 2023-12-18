import { Input } from "antd";

const RSPInput = ({ variant, className, ...restProps }) => {
  return variant === "password" ? (
    <Input.Password className={`p-15 ${className}`} {...restProps} />
  ) : (
    <Input className={`p-15 ${className}`} {...restProps} />
  );
};

export default RSPInput;
