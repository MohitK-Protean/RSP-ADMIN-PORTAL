import { Checkbox } from "antd";
import cx from "classnames";
import styles from "./checkbox.module.scss";

export const RSPCheckbox = ({
  variant = "default",
  children,
  className,
  ...restProps
}) => {
  const checkboxClass = cx(
    { [styles["contained"]]: variant === "contained" },
    className
  );

  return (
    <Checkbox {...restProps} className={checkboxClass}>
      {children}
    </Checkbox>
  );
};
