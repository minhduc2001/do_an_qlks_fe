import { FileSearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { Tooltip } from "antd";
interface FloatButtonProps {
  onClick: () => void;
}

const FloatButton = (props: FloatButtonProps) => {
  return (
    <Tooltip title="Tìm kiếm phòng" placement={"left"}>
      <div
        className="fixed bottom-20 right-10 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={props.onClick}
      >
        <FileSearchOutlined />
      </div>
    </Tooltip>
  );
};
export default FloatButton;
