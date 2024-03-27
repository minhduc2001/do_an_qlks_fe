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
        className="fixed bottom-20 right-20 bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center cursor-pointer"
        onClick={props.onClick}
      >
        <FileSearchOutlined className="text-[30px]" />
      </div>
    </Tooltip>
  );
};
export default FloatButton;
