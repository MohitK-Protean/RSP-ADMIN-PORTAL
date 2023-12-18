import { Card } from "antd";
import styles from "./card.module.scss";
import cx from "classnames";

const RSPCard = ({
  cardSize,
  paddingSize,
  className,
  children,
  ...restProps
}) => {
  const cardClass = cx(
    { [styles["card-medium"]]: cardSize === "medium" },
    { [styles["card-padding-large"]]: paddingSize === "large" },
    className
  );

  return (
    <Card {...restProps} className={cardClass}>
      {children}
    </Card>
  );
};

export default RSPCard;
