import ApiRoom from "@/api/ApiRoom";
import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AsNavFor from "./AsForNav/AsForNav";
import SubHeader from "@/components/SubHeader/SubHeader";
import { FaSquare, FaUsers } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import ModalOrderRoom from "@/components/ModalOrderRoom";
import ApiUser from "@/api/ApiUser";
import ModalNotiLogin from "@/components/ModalNotiLogin";

export default function DetailRoom() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const { id: slug = "" } = useParams();

  const { data: room } = useQuery(
    ["get_room", slug],
    () => ApiRoom.getRoom(slug),
    { enabled: !!slug }
  );

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCloseModal1 = () => {
    setIsOpenModal1(false);
  };

  const handleCloseModal2 = () => {
    setIsOpenModal2(false);
  };

  const handleClick = () => {
    if (!ApiUser.isLogin()) return setIsOpenModal1(true);
    if (ApiUser.isFirstLogin()) return setIsOpenModal2(true);
    setIsOpenModal(true);
  };

  return (
    <div className="detail-room-page">
      <SubHeader
        title={room?.name ?? ""}
        description=""
        image={room?.images?.[0]}
      />
      <div className="px-20 py-10">
        <div className="px-20 flex justify-center">
          <AsNavFor images={room?.images ?? []} />
        </div>
        <div className="w-full flex justify-center mt-20">
          <Row gutter={66} className="w-[1140px]" justify={"center"}>
            <Col span={12}>
              <div className="div-1">
                <h1>Mô tả</h1>
                <p>{room?.description}</p>
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
                          <span>Người lớn: {room?.parent}</span>
                        </li>
                        <li>
                          <FaEye />
                          <span>Chứa tối đa: {room?.contains}</span>
                        </li>
                        <li>
                          <FaSquare />
                          <span>Diện tích: {room?.area} m²</span>
                        </li>
                        <li>
                          <FaBed />
                          <span>Loại giường: {room?.type_bed}</span>
                        </li>
                        <li>
                          <FaRegClock />
                          <span>Check in: {room?.checkin}</span>
                        </li>
                        <li>
                          <FaClock />
                          <span>Check out: {room?.checkout}</span>
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
        title={"Hãy đăng nhập để đặt phòng"}
        handleSubmit={() => navigate("/login")}
      />

      <ModalNotiLogin
        isOpenModal={isOpenModal2}
        handleCloseModal={handleCloseModal2}
        title={"Hãy cập nhật thông tin để đặt phòng"}
        handleSubmit={() => navigate("/user")}
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
