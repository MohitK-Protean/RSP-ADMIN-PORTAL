import { Select } from "antd";

export const RSPSelect = ({ variant = "default", className, ...restProps }) => {
  return variant === "transparent" ? (
    <Select
      className={`select-container select-transparent ${className}`}
      {...restProps}
    />
  ) : (
    <Select className={`select-container ${className}`} {...restProps} />
  );
};
