import React from "react";
import { Modal } from "antd";
import cx from "classnames";

export const RSPModal = ({
  paddingSize = "md",
  className,
  children,
  ...restProps
}) => {
  const modalClass = cx(
    { "padding-sm": paddingSize === "sm" },
    { "padding-md": paddingSize === "md" },
    { "padding-lg": paddingSize === "lg" },
    className
  );

  return (
    <Modal className={modalClass} closable={false} {...restProps}>
      {children}
    </Modal>
  );
};

// RSPModal.propTypes={} TODO define Modal propTypes
