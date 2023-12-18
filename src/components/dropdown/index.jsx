import { Dropdown } from "antd";

export const RSPDropdown = ({ children, ...restProps }) => {
  return (
    <Dropdown trigger={["click"]} {...restProps}>
      {children}
    </Dropdown>
  );
};
