import ApiRoom, { IRoomRes } from "@/api/ApiRoom";
import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Col, Image, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import AsNavFor from "./AsForNav/AsForNav";
import SubHeader from "@/components/SubHeader/SubHeader";

export default function DetailRoom() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [roomSelected, setRoomSelected] = useState<IRoomRes>();

  const navigate = useNavigate();
  const { id: slug = "" } = useParams();

  const { data: room } = useQuery(
    ["get_room", slug],
    () => ApiRoom.getRoom(slug),
    { enabled: !!slug }
  );

  const { data: rooms } = useQuery(["get_rooms_1"], () => ApiRoom.getRooms());

  const displayRooms = useMemo(() => {
    return rooms?.results.filter((item) => item.slug !== slug);
  }, [rooms, slug]);

  const openDetail = (slug: string) => {
    navigate(`/room/${slug}`);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setRoomSelected(undefined);
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
                    {[
                      { name: "hahha" },
                      { name: "hahha" },
                      { name: "hahha" },
                    ].map((ft, index) => {
                      return <li key={index}>{ft.name}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="bg-[#FAF7F2] w-full h-[490px]">
                <div>
                  <img src="" alt="" />
                  <div>
                    <span>1.870.000</span>
                    <p>
                      Giá trên đã bao gồm VAT & Phí phục vụ, chưa bao gồm phụ
                      thu ngày Lễ tết
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* {roomSelected && (
        <ModalOrderRoom
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
          roomSelected={roomSelected}
        />
      )} */}
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
