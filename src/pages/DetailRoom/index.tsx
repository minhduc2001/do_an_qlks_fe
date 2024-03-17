import ApiRoom, { IRoomRes } from "@/api/ApiRoom";
import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Col, Image, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import AsNavFor from "./AsForNav/AsForNav";
import SubHeader from "@/components/SubHeader/SubHeader";
import { FaSquare, FaUsers } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import ModalOrderRoom from "@/components/ModalOrderRoom";
import ApiUser from "@/api/ApiUser";
import ModalNotiLogin from "@/components/ModalNotiLogin";

export default function DetailRoom() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal1, setIsOpenModal1] = useState(false);

  const { id: slug = "" } = useParams();

  const { data: room } = useQuery(
    ["get_room", slug],
    () => ApiRoom.getRoom(slug),
    { enabled: !!slug }
  );

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCloseModal1 = () => {
    setIsOpenModal1(false);
  };

  const handleClick = () => {
    if (!ApiUser.isLogin()) return setIsOpenModal1(true);
    setIsOpenModal(true);
  };

  return (
    <div className="detail-room-page">
      <SubHeader title="" description="" image={room?.images?.[0]} />
      <div className="px-20 py-10">
        <div className="px-20 flex justify-center">
          <AsNavFor images={room?.images ?? []} />
        </div>
        <div className="w-full flex justify-center mt-20">
          <Row gutter={66} className="w-[1140px]" justify={"center"}>
            <Col span={12}>
              <div className="div-1">
                <h1>Mô tả</h1>
                <p>
                  Phòng Superior Double ấm cúng, gần gũi giống như một ngôi nhà.
                  Với tầm nhìn đẹp, đây chắc chắn là hạng phòng lý tưởng cho các
                  chuyến du lịch, công tác ngắn, dài ngày.
                </p>
                <div className="service">
                  <span>Giá bao gồm các dịch vụ:</span>
                  <ul>
                    {room?.feature_rooms?.map((ft, index) => {
                      return <li key={index}>{ft.name}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="bg-[#FAF7F2] w-full  div-2">
                <div>
                  <img src="" alt="" />
                  <div className="div-info-price">
                    <span>{room?.price?.toLocaleString()} đ</span>
                    <p>
                      Giá trên đã bao gồm VAT & Phí phục vụ, chưa bao gồm phụ
                    </p>

                    <div className="div-info-room">
                      <ul>
                        <li>
                          <FaUsers />
                          <span>Người lớn</span>
                        </li>
                        <li>
                          <FaEye />
                          <span>
                            Chứa tối đa : Hai người lớn, một trẻ em dưới 6 tuổi
                          </span>
                        </li>
                        <li>
                          <FaSquare />
                          <span>Diện tích: 35m²</span>
                        </li>
                        <li>
                          <FaBed />
                          <span>Loại giường: Giường cỡ lớn (2.2m x 2.2m)</span>
                        </li>
                        <li>
                          <FaRegClock />
                          <span>Check in: 02:00p.m</span>
                        </li>
                        <li>
                          <FaClock />
                          <span>Check out: 12:00p.m</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button onClick={handleClick}>Đặt phòng ngay</button>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {room && (
        <ModalOrderRoom
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
          roomSelected={room}
        />
      )}

      <ModalNotiLogin
        isOpenModal={isOpenModal1}
        handleCloseModal={handleCloseModal1}
      />
    </div>
  );
}

{
  /* <div className="mx-auto text-center max-w-[1000px] mb-5">
          {room?.description || "Mô tả phòng chờ cập nhật"}
        </div>
        <div className="mx-auto text-center max-w-[1000px] mb-5">
          Giá phòng: {(room?.price ?? 0).toLocaleString()} vnđ
        </div>
        <div className="flex justify-center">
          <ButtonGlobal
            onClick={() => {
              setRoomSelected(room);
              setIsOpenModal(true);
            }}
          >
            Đặt phòng
          </ButtonGlobal>
        </div> */
}
