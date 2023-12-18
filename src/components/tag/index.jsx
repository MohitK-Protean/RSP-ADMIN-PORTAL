import { Tag } from "antd";
import cx from "classnames";
import styles from "./tag.module.scss";

const RSPTag = ({
  tagSize = "medium",
  tagColor = "primary",
  className,
  children,
  ...restProps
}) => {
  const tagClass = cx(
    { [styles["tag-medium"]]: tagSize === "medium" },
    { [styles["tag-large"]]: tagSize === "large" },
    { [styles["tag-primary"]]: tagColor === "primary" },
    { [styles["tag-secondary"]]: tagColor === "secondary" },
    { [styles["tag-success"]]: tagColor === "success" },
    { [styles["tag-warning"]]: tagColor === "warning" },
    { [styles["tag-danger"]]: tagColor === "danger" },
    { [styles["tag-violet"]]: tagColor === "violet" },
    styles.tag,
    className
  );
  return (
    <Tag {...restProps} className={tagClass}>
      {children}
    </Tag>
  );
};

export default RSPTag;
