import { Table, } from "antd";

const RSPTable = ({ pagination , ...restProps }) => {
  return <Table pagination={{...pagination}} {...restProps} />;
};

export default RSPTable;
