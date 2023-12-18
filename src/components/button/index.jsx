import styles from "./button.module.scss";
import { Button } from "antd";
import cx from "classnames";

const RSPButton = ({ type = "primary", className, children, ...restProps }) => {
  const classNames = cx(
    { "btn-link": type === "link" },
    { "btn-secondary": type === "secondary" },
    styles["rsp-btn"],
    className
  );
  return (
    <Button type={type} className={classNames} {...restProps}>
      {children}
    </Button>
  );
};

export default RSPButton;
