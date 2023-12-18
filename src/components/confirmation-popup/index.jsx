import { Popconfirm } from "antd";

export const RSPConfirmationPopup = ({ children, ...restProps }) => {
  return <Popconfirm {...restProps}>{children}</Popconfirm>;
};
