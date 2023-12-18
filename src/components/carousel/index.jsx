import React from "react";
import { Carousel } from "antd";
import styles from "./carousel.module.scss";
import cx from "classnames";

const RSPCarousel = ({
  variant = "primary",
  className,
  children,
  ...restProps
}) => {
  const carouselClass = cx(
    { [styles["carousel-primary"]]: variant === "primary" },
    styles["rsp-carousel"],
    className
  );
  return (
    <Carousel {...restProps} className={carouselClass}>
      {children}
    </Carousel>
  );
};
export default RSPCarousel;
