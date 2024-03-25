import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { Image } from "antd";

import {
  DoubleRightOutlined,
  ExpandOutlined,
  LayoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";

interface ItemRoomProps {
  item: any;
}

const ItemRoom = (props: ItemRoomProps) => {
  const navigate = useNavigate();
  const openDetail = (slug: string) => {
    navigate(`/room/${slug}`);
  };

  return (
    <>
      <div className="text-center root bg-white">
        <div className="w-full h-[206px] overflow-hidden div-image">
          <Image
            className=" w-full h-full object-cover transition-all duration-300 ease-out cursor-pointer"
            src={
              props.item.images?.length ?? 0 > 0
                ? props.item.images?.[0]
                : "https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
            }
            preview={false}
            onClick={() => openDetail(props.item.slug)}
          />
        </div>
        <div className="text-left">
          <h2
            className="cursor-pointer text-[22px] text-[#003C4C] hover:text-[#fcb134] mt-2 font-bold"
            role="presentation"
            onClick={() => openDetail(props.item.slug)}
          >
            {props.item.name || "Tên phòng chờ cập nhật"}
          </h2>
          <h1 className="text-center cursor-pointer text-[33px] text-[#003C4C] hover:text-[#fcb134] mt-2">
            {props.item.price.toLocaleString()} đ
          </h1>
          <p className="text-center cursor-pointer text-[12px] text-[#7A7A7A] hover:text-[#fcb134] mt-2 ">
            Giá trên đã bao gồm VAT & Phí phục vụ, chưa bao gồm phụ thu ngày Lễ
            tết
          </p>
          <p className="my-3 text-[17px] text-[#003C4C] overflow-hidden h-[200px]">
            {props.item.description || "Mô tả phòng chờ cập nhật"}
          </p>

          <ul>
            <li className="flex list-feature">
              <TeamOutlined />
              <p>2 người lớn + 1 trẻ dưới 6 tuổi</p>
            </li>
            <li className="flex list-feature">
              <ExpandOutlined />
              <p>Diện tích 35m²</p>
            </li>
            <li className="flex list-feature">
              <LayoutOutlined />
              <p>Giường cỡ lớn (2.2m x 2.2m)</p>
            </li>
          </ul>
        </div>

        <div className="flex justify-center gap-3">
          <Link className="link" to={props.item.slug}>
            Chi tiết
            <DoubleRightOutlined />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemRoom;
